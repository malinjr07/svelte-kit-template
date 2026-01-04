> Available since 2.27

Remote functions are a tool for type-safe communication between client and server. They can be _called_ anywhere in your app, but always _run_ on the server, meaning they can safely access [server-only modules](https://svelte.dev/docs/kit/server-only-modules) containing things like environment variables and database clients.

Combined with Svelte’s experimental support for [`await`](https://svelte.dev/docs/svelte/await-expressions), it allows you to load and manipulate data directly inside your components.

This feature is currently experimental, meaning it is likely to contain bugs and is subject to change without notice. You must opt in by adding the `kit.experimental.remoteFunctions` option in your `svelte.config.js` and optionally, the `compilerOptions.experimental.async` option to use `await` in components:

svelte.config

```yaml
/** @type {import('@sveltejs/kit').Config} */
const config = {
kit: {
experimental: {
remoteFunctions: true
}
},
compilerOptions: {
experimental: {
async: true
}
}
};

export default config;
```

## Overview[](https://svelte.dev/docs/kit/remote-functions#Overview)

Remote functions are exported from a `.remote.js` or `.remote.ts` file, and come in four flavours: `query`, `form`, `command` and `prerender`. On the client, the exported functions are transformed to `fetch` wrappers that invoke their counterparts on the server via a generated HTTP endpoint. Remote files can be placed anywhere in your `src` directory (except inside the `src/lib/server` directory), and third party libraries can provide them, too.

## query[](https://svelte.dev/docs/kit/remote-functions#query)

The `query` function allows you to read dynamic data from the server (for _static_ data, consider using [`prerender`](https://svelte.dev/docs/kit/remote-functions#prerender) instead):

src/routes/blog/data.remote

```javascript
import { query } from '$app/server';
import * as db from '$lib/server/database';

export const getPosts = query(async () => {
const posts = await db.sql`
SELECT title, slug
FROM post
ORDER BY published_at
DESC
`;

return posts;
});
```

> Throughout this page, you’ll see imports from fictional modules like `$lib/server/database` and `$lib/server/auth`. These are purely for illustrative purposes — you can use whatever database client and auth setup you like.
> 
> The `db.sql` function above is a [tagged template function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) that escapes any interpolated values.

The query returned from `getPosts` works as a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to `posts`:

Until the promise resolves — and if it errors — the nearest [`<svelte:boundary>`](https://svelte.dev/docs/svelte/svelte-boundary) will be invoked.

While using `await` is recommended, as an alternative the query also has `loading`, `error` and `current` properties:

> For the rest of this document, we’ll use the `await` form.

### Query arguments[](https://svelte.dev/docs/kit/remote-functions#query-Query-arguments)

Query functions can accept an argument, such as the `slug` of an individual post:

src/routes/blog/\[slug\]/+page

Since `getPost` exposes an HTTP endpoint, it’s important to validate this argument to be sure that it’s the correct type. For this, we can use any [Standard Schema](https://standardschema.dev/) validation library such as [Zod](https://zod.dev/) or [Valibot](https://valibot.dev/):

src/routes/blog/data.remote

```javascript
import * as v from 'valibot';
import { error } from '@sveltejs/kit';
import { query } from '$app/server';
import * as db from '$lib/server/database';

export const getPosts = query(async () => { /* ... */ });

export const getPost = query(v.string(), async (slug) => {
const [post] = await db.sql`
SELECT * FROM post
WHERE slug = ${slug}
`;

if (!post) error(404, 'Not found');
return post;
});
```

Both the argument and the return value are serialized with [devalue](https://github.com/sveltejs/devalue), which handles types like `Date` and `Map` (and custom types defined in your [transport hook](https://svelte.dev/docs/kit/hooks#Universal-hooks-transport)) in addition to JSON.

### Refreshing queries[](https://svelte.dev/docs/kit/remote-functions#query-Refreshing-queries)

Any query can be re-fetched via its `refresh` method, which retrieves the latest value from the server:

```php-template
<button onclick={() => getPosts().refresh()}>
Check for new posts
</button>
```

> Queries are cached while they’re on the page, meaning `getPosts() === getPosts()`. This means you don’t need a reference like `const posts = getPosts()` in order to update the query.

## query.batch[](https://svelte.dev/docs/kit/remote-functions#query.batch)

`query.batch` works like `query` except that it batches requests that happen within the same macrotask. This solves the so-called n+1 problem: rather than each query resulting in a separate database call (for example), simultaneous queries are grouped together.

On the server, the callback receives an array of the arguments the function was called with. It must return a function of the form `(input: Input, index: number) => Output`. SvelteKit will then call this with each of the input arguments to resolve the individual calls with their results.

weather.remote

```javascript
import * as v from 'valibot';
import { query } from '$app/server';
import * as db from '$lib/server/database';

export const getWeather = query.batch(v.string(), async (cities) => {
const weather = await db.sql`
SELECT * FROM weather
WHERE city = ANY(${cities})
`;
const lookup = new Map(weather.map(w => [w.city, w]));

return (city) => lookup.get(city);
});
```

## form[](https://svelte.dev/docs/kit/remote-functions#form)

The `form` function makes it easy to write data to the server. It takes a callback that receives `data` constructed from the submitted [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)...

src/routes/blog/data.remote

```javascript
import * as v from 'valibot';
import { error, redirect } from '@sveltejs/kit';
import { query, form } from '$app/server';
import * as db from '$lib/server/database';
import * as auth from '$lib/server/auth';

export const getPosts = query(async () => { /* ... */ });

export const getPost = query(v.string(), async (slug) => { /* ... */ });

export const createPost = form(
v.object({
title: v.pipe(v.string(), v.nonEmpty()),
content:v.pipe(v.string(), v.nonEmpty())
}),
async ({ title, content }) => {
// Check the user is logged in
const user = await auth.getUser();
if (!user) error(401, 'Unauthorized');

const slug = title.toLowerCase().replace(/ /g, '-');

// Insert into the database
await db.sql`
INSERT INTO post (slug, title, content)
VALUES (${slug}, ${title}, ${content})
`;

// Redirect to the newly created page
redirect(303, `/blog/${slug}`);
}
);
```

...and returns an object that can be spread onto a `<form>` element. The callback is called whenever the form is submitted.

src/routes/blog/new/+page

The form object contains `method` and `action` properties that allow it to work without JavaScript (i.e. it submits data and reloads the page). It also has an [attachment](https://svelte.dev/docs/svelte/@attach) that progressively enhances the form when JavaScript is available, submitting data _without_ reloading the entire page.

As with `query`, if the callback uses the submitted `data`, it should be [validated](https://svelte.dev/docs/kit/remote-functions#query-Query-arguments) by passing a [Standard Schema](https://standardschema.dev/) as the first argument to `form`.

### Fields[](https://svelte.dev/docs/kit/remote-functions#form-Fields)

A form is composed of a set of _fields_, which are defined by the schema. In the case of `createPost`, we have two fields, `title` and `content`, which are both strings. To get the attributes for a field, call its `.as(...)` method, specifying which [input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types) to use:

```php-template
<form {...createPost}>
<label>
<h2>Title</h2>
<input {...createPost.fields.title.as('text')} />
</label>

<label>
<h2>Write your post</h2>
<textarea {...createPost.fields.content.as('text')}></textarea>
</label>

<button>Publish!</button>
</form>
```

These attributes allow SvelteKit to set the correct input type, set a `name` that is used to construct the `data` passed to the handler, populate the `value` of the form (for example following a failed submission, to save the user having to re-enter everything), and set the [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid) state.

> The generated `name` attribute uses JS object notation (e.g. `nested.array[0].value`). String keys that require quotes such as `object['nested-array'][0].value` are not supported. Under the hood, boolean checkbox and number field names are prefixed with `b:` and `n:`, respectively, to signal SvelteKit to coerce the values from strings prior to validation.

Fields can be nested in objects and arrays, and their values can be strings, numbers, booleans or `File` objects. For example, if your schema looked like this...

data.remote

```php
const datingProfile = v.object({
name: v.string(),
photo: v.file(),
info: v.object({
height: v.number(),
likesDogs: v.optional(v.boolean(), false)
}),
attributes: v.array(v.string())
});

export const createProfile = form(datingProfile, (data) => { /* ... */ });
```

...your form could look like this:

```php-template
<script>
import { createProfile } from './data.remote';

const { name, photo, info, attributes } = createProfile.fields;
</script>

<form {...createProfile} enctype="multipart/form-data">
<label>
<input {...name.as('text')} /> Name
</label>

<label>
<input {...photo.as('file')} /> Photo
</label>

<label>
<input {...info.height.as('number')} /> Height (cm)
</label>

<label>
<input {...info.likesDogs.as('checkbox')} /> I like dogs
</label>

<h2>My best attributes</h2>
<input {...attributes[0].as('text')} />
<input {...attributes[1].as('text')} />
<input {...attributes[2].as('text')} />

<button>submit</button>
</form>
```

Because our form contains a `file` input, we’ve added an `enctype="multipart/form-data"` attribute. The values for `info.height` and `info.likesDogs` are coerced to a number and a boolean respectively.

> If a `checkbox` input is unchecked, the value is not included in the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object that SvelteKit constructs the data from. As such, we have to make the value optional in our schema. In Valibot that means using `v.optional(v.boolean(), false)` instead of just `v.boolean()`, whereas in Zod it would mean using `z.coerce.boolean<boolean>()`.

In the case of `radio` and `checkbox` inputs that all belong to the same field, the `value` must be specified as a second argument to `.as(...)`:

data.remote

```php
export const survey = form(
v.object({
operatingSystem: v.picklist(['windows', 'mac', 'linux']),
languages: v.optional(v.array(v.picklist(['html', 'css', 'js'])), [])
}),
(data) => { /* ... */ }
);
```

```bash
<form {...survey}>
<h2>Which operating system do you use?</h2>

{#each ['windows', 'mac', 'linux'] as os}
<label>
<input {...survey.fields.operatingSystem.as('radio', os)}>
{os}
</label>
{/each}

<h2>Which languages do you write code in?</h2>

{#each ['html', 'css', 'js'] as language}
<label>
<input {...survey.fields.languages.as('checkbox', language)}>
{language}
</label>
{/each}

<button>submit</button>
</form>
```

Alternatively, you could use `select` and `select multiple`:

```php-template
<form {...survey}>
<h2>Which operating system do you use?</h2>

<select {...survey.fields.operatingSystem.as('select')}>
<option>windows</option>
<option>mac</option>
<option>linux</option>
</select>

<h2>Which languages do you write code in?</h2>

<select {...survey.fields.languages.as('select multiple')}>
<option>html</option>
<option>css</option>
<option>js</option>
</select>

<button>submit</button>
</form>
```

> As with unchecked `checkbox` inputs, if no selections are made then the data will be `undefined`. For this reason, the `languages` field uses `v.optional(v.array(...), [])` rather than just `v.array(...)`.

### Programmatic validation[](https://svelte.dev/docs/kit/remote-functions#form-Programmatic-validation)

In addition to declarative schema validation, you can programmatically mark fields as invalid inside the form handler using the `invalid` function. This is useful for cases where you can’t know if something is valid until you try to perform some action. Just like `redirect` or `error`, `invalid` throws. It expects a list of strings (for issues relating to the form as a whole) or standard-schema-compliant issues (for those relating to a specific field). Use the `issue` parameter for type-safe creation of such issues:

src/routes/shop/data.remote

```javascript
import * as v from 'valibot';
import { invalid } from '@sveltejs/kit';
import { form } from '$app/server';
import * as db from '$lib/server/database';

export const buyHotcakes = form(
v.object({
qty: v.pipe(
v.number(),
v.minValue(1, 'you must buy at least one hotcake')
)
}),
async (data, issue) => {
try {
await db.buy(data.qty);
} catch (e) {
if (e.code === 'OUT_OF_STOCK') {
invalid(
issue.qty(`we don't have enough hotcakes`)
);
}
}
}
);
```

The `invalid` function works as both a function and a proxy:

-   Call `invalid(issue1, issue2, ...issueN)` to throw a validation error
-   If an issue is a `string`, it applies to the form as a whole (and will show up in `fields.allIssues()`)
-   Use `invalid.fieldName(message)` to create an issue for a specific field. Like `fields` this is type-safe and you can use regular property access syntax to create issues for deeply nested objects (e.g. `invalid.profile.email('Email already exists')` or `invalid.items[0].qty('Insufficient stock')`)

### Validation[](https://svelte.dev/docs/kit/remote-functions#form-Validation)

If the submitted data doesn’t pass the schema, the callback will not run. Instead, each invalid field’s `issues()` method will return an array of `{ message: string }` objects, and the `aria-invalid` attribute (returned from `as(...)`) will be set to `true`:

```php-template
<form {...createPost}>
<label>
<h2>Title</h2>

{#each createPost.fields.title.issues() as issue}
<p class="issue">{issue.message}</p>
{/each}

<input {...createPost.fields.title.as('text')} />
</label>

<label>
<h2>Write your post</h2>

{#each createPost.fields.content.issues() as issue}
<p class="issue">{issue.message}</p>
{/each}

<textarea {...createPost.fields.content.as('text')}></textarea>
</label>

<button>Publish!</button>
</form>
```

You don’t need to wait until the form is submitted to validate the data — you can call `validate()` programmatically, for example in an `oninput` callback (which will validate the data on every keystroke) or an `onchange` callback:

```php-template
<form {...createPost} oninput={() => createPost.validate()}>
<!-- -->
</form>
```

By default, issues will be ignored if they belong to form controls that haven’t yet been interacted with. To validate _all_ inputs, call `validate({ includeUntouched: true })`.

For client-side validation, you can specify a _preflight_ schema which will populate `issues()` and prevent data being sent to the server if the data doesn’t validate:

```php-template
<script>
import * as v from 'valibot';
import { createPost } from '../data.remote';

const schema = v.object({
title: v.pipe(v.string(), v.nonEmpty()),
content: v.pipe(v.string(), v.nonEmpty())
});
</script>

<h1>Create a new post</h1>

<form {...createPost.preflight(schema)}>
<!-- -->
</form>
```

> The preflight schema can be the same object as your server-side schema, if appropriate, though it won’t be able to do server-side checks like ‘this value already exists in the database’. Note that you cannot export a schema from a `.remote.ts` or `.remote.js` file, so the schema must either be exported from a shared module, or from a `<script module>` block in the component containing the `<form>`.

To get a list of _all_ issues, rather than just those belonging to a single field, you can use the `fields.allIssues()` method:

```perl
{#each createPost.fields.allIssues() as issue}
<p>{issue.message}</p>
{/each}
```

### Getting/setting inputs[](https://svelte.dev/docs/kit/remote-functions#form-Getting-setting-inputs)

Each field has a `value()` method that reflects its current value. As the user interacts with the form, it is automatically updated:

```php-template
<form {...createPost}>
<!-- -->
</form>

<div class="preview">
<h2>{createPost.fields.title.value()}</h2>
<div>{@html render(createPost.fields.content.value())}</div>
</div>
```

Alternatively, `createPost.fields.value()` would return a `{ title, content }` object.

You can update a field (or a collection of fields) via the `set(...)` method:

```php-template
<script>
import { createPost } from '../data.remote';

// this...
createPost.fields.set({
title: 'My new blog post',
content: 'Lorem ipsum dolor sit amet...'
});

// ...is equivalent to this:
createPost.fields.title.set('My new blog post');
createPost.fields.content.set('Lorem ipsum dolor sit amet');
</script>
```

### Handling sensitive data[](https://svelte.dev/docs/kit/remote-functions#form-Handling-sensitive-data)

In the case of a non-progressively-enhanced form submission (i.e. where JavaScript is unavailable, for whatever reason) `value()` is also populated if the submitted data is invalid, so that the user does not need to fill the entire form out from scratch.

You can prevent sensitive data (such as passwords and credit card numbers) from being sent back to the user by using a name with a leading underscore:

```php-template
<form {...register}>
<label>
Username
<input {...register.fields.username.as('text')} />
</label>

<label>
Password
<input {...register.fields._password.as('password')} />
</label>

<button>Sign up!</button>
</form>
```

In this example, if the data does not validate, only the first `<input>` will be populated when the page reloads.

### Single-flight mutations[](https://svelte.dev/docs/kit/remote-functions#form-Single-flight-mutations)

By default, all queries used on the page (along with any `load` functions) are automatically refreshed following a successful form submission. This ensures that everything is up-to-date, but it’s also inefficient: many queries will be unchanged, and it requires a second trip to the server to get the updated data.

Instead, we can specify which queries should be refreshed in response to a particular form submission. This is called a _single-flight mutation_, and there are two ways to achieve it. The first is to refresh the query on the server, inside the form handler:

```csharp
export const getPosts = query(async () => { /* ... */ });

export const getPost = query(v.string(), async (slug) => { /* ... */ });

export const createPost = form(
v.object({/* ... */}),
async (data) => {
// form logic goes here...

// Refresh `getPosts()` on the server, and send
// the data back with the result of `createPost`
await getPosts().refresh();

// Redirect to the newly created page
redirect(303, `/blog/${slug}`);
}
);

export const updatePost = form(
v.object({/* ... */}),
async (data) => {
// form logic goes here...
const result = externalApi.update(post);

// The API already gives us the updated post,
// no need to refresh it, we can set it directly
await getPost(post.id).set(result);
}
);
```

The second is to drive the single-flight mutation from the client, which we’ll see in the section on [`enhance`](https://svelte.dev/docs/kit/remote-functions#form-enhance).

### Returns and redirects[](https://svelte.dev/docs/kit/remote-functions#form-Returns-and-redirects)

The example above uses [`redirect(...)`](https://svelte.dev/docs/kit/@sveltejs-kit#redirect), which sends the user to the newly created page. Alternatively, the callback could return data, in which case it would be available as `createPost.result`:

src/routes/blog/data.remote

```kotlin
export const createPost = form(
v.object({/* ... */}),
async (data) => {
// ...

return { success: true };
}
);
```

src/routes/blog/new/+page

This value is _ephemeral_ — it will vanish if you resubmit, navigate away, or reload the page.

> The `result` value need not indicate success — it can also contain validation errors, along with any data that should repopulate the form on page reload.

If an error occurs during submission, the nearest `+error.svelte` page will be rendered.

### enhance[](https://svelte.dev/docs/kit/remote-functions#form-enhance)

We can customize what happens when the form is submitted with the `enhance` method:

src/routes/blog/new/+page

> When using `enhance`, the `<form>` is not automatically reset — you must call `form.reset()` if you want to clear the inputs.

The callback receives the `form` element, the `data` it contains, and a `submit` function.

To enable client-driven [single-flight mutations](https://svelte.dev/docs/kit/remote-functions#form-Single-flight-mutations), use `submit().updates(...)`. For example, if the `getPosts()` query was used on this page, we could refresh it like so:

```scss
await submit().updates(getPosts());
```

We can also _override_ the current data while the submission is ongoing:

```javascript
await submit().updates(
getPosts().withOverride((posts) => [newPost, ...posts])
);
```

The override will be applied immediately, and released when the submission completes (or fails).

### Multiple instances of a form[](https://svelte.dev/docs/kit/remote-functions#form-Multiple-instances-of-a-form)

Some forms may be repeated as part of a list. In this case you can create separate instances of a form function via `for(id)` to achieve isolation.

### buttonProps[](https://svelte.dev/docs/kit/remote-functions#form-buttonProps)

By default, submitting a form will send a request to the URL indicated by the `<form>` element’s [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#attributes_for_form_submission) attribute, which in the case of a remote function is a property on the form object generated by SvelteKit.

It’s possible for a `<button>` inside the `<form>` to send the request to a _different_ URL, using the [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#formaction) attribute. For example, you might have a single form that allows you to log in or register depending on which button was clicked.

This attribute exists on the `buttonProps` property of a form object:

Like the form object itself, `buttonProps` has an `enhance` method for customizing submission behaviour.

## command[](https://svelte.dev/docs/kit/remote-functions#command)

The `command` function, like `form`, allows you to write data to the server. Unlike `form`, it’s not specific to an element and can be called from anywhere.

> Prefer `form` where possible, since it gracefully degrades if JavaScript is disabled or fails to load.

As with `query` and `form`, if the function accepts an argument, it should be [validated](https://svelte.dev/docs/kit/remote-functions#query-Query-arguments) by passing a [Standard Schema](https://standardschema.dev/) as the first argument to `command`.

likes.remote

```javascript
import * as v from 'valibot';
import { query, command } from '$app/server';
import * as db from '$lib/server/database';

export const getLikes = query(v.string(), async (id) => {
const [row] = await db.sql`
SELECT likes
FROM item
WHERE id = ${id}
`;

return row.likes;
});

export const addLike = command(v.string(), async (id) => {
await db.sql`
UPDATE item
SET likes = likes + 1
WHERE id = ${id}
`;
});
```

Now simply call `addLike`, from (for example) an event handler:

> Commands cannot be called during render.

### Updating queries[](https://svelte.dev/docs/kit/remote-functions#command-Updating-queries)

To update `getLikes(item.id)`, or any other query, we need to tell SvelteKit _which_ queries need to be refreshed (unlike `form`, which by default invalidates everything, to approximate the behaviour of a native form submission).

We either do that inside the command itself...

likes.remote

```csharp
export const getLikes = query(v.string(), async (id) => { /* ... */ });

export const addLike = command(v.string(), async (id) => {
await db.sql`
UPDATE item
SET likes = likes + 1
WHERE id = ${id}
`;

getLikes(id).refresh();
// Just like within form functions you can also do
// getLikes(id).set(...)
// in case you have the result already
});
```

...or when we call it:

```scss
try {
await addLike(item.id).updates(getLikes(item.id));
} catch (error) {
showToast('Something went wrong!');
}
```

As before, we can use `withOverride` for optimistic updates:

```javascript
try {
await addLike(item.id).updates(
getLikes(item.id).withOverride((n) => n + 1)
);
} catch (error) {
showToast('Something went wrong!');
}
```

## prerender[](https://svelte.dev/docs/kit/remote-functions#prerender)

The `prerender` function is similar to `query`, except that it will be invoked at build time to prerender the result. Use this for data that changes at most once per redeployment.

src/routes/blog/data.remote

```javascript
import { prerender } from '$app/server';
import * as db from '$lib/server/database';

export const getPosts = prerender(async () => {
const posts = await db.sql`
SELECT title, slug
FROM post
ORDER BY published_at
DESC
`;

return posts;
});
```

You can use `prerender` functions on pages that are otherwise dynamic, allowing for partial prerendering of your data. This results in very fast navigation, since prerendered data can live on a CDN along with your other static assets.

In the browser, prerendered data is saved using the [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache) API. This cache survives page reloads, and will be cleared when the user first visits a new deployment of your app.

> When the entire page has `export const prerender = true`, you cannot use queries, as they are dynamic.

### Prerender arguments[](https://svelte.dev/docs/kit/remote-functions#prerender-Prerender-arguments)

As with queries, prerender functions can accept an argument, which should be [validated](https://svelte.dev/docs/kit/remote-functions#query-Query-arguments) with a [Standard Schema](https://standardschema.dev/):

src/routes/blog/data.remote

```javascript
import * as v from 'valibot';
import { error } from '@sveltejs/kit';
import { prerender } from '$app/server';
import * as db from '$lib/server/database';

export const getPosts = prerender(async () => { /* ... */ });

export const getPost = prerender(v.string(), async (slug) => {
const [post] = await db.sql`
SELECT * FROM post
WHERE slug = ${slug}
`;

if (!post) error(404, 'Not found');
return post;
});
```

Any calls to `getPost(...)` found by SvelteKit’s crawler while [prerendering pages](https://svelte.dev/docs/kit/page-options#prerender) will be saved automatically, but you can also specify which values it should be called with using the `inputs` option:

src/routes/blog/data.remote

By default, prerender functions are excluded from your server bundle, which means that you cannot call them with any arguments that were _not_ prerendered. You can set `dynamic: true` to change this behaviour:

src/routes/blog/data.remote

## Handling validation errors[](https://svelte.dev/docs/kit/remote-functions#Handling-validation-errors)

As long as _you’re_ not passing invalid data to your remote functions, there are only two reasons why the argument passed to a `command`, `query` or `prerender` function would fail validation:

-   the function signature changed between deployments, and some users are currently on an older version of your app
-   someone is trying to attack your site by poking your exposed endpoints with bad data

In the second case, we don’t want to give the attacker any help, so SvelteKit will generate a generic [400 Bad Request](https://http.dog/400) response. You can control the message by implementing the [`handleValidationError`](https://svelte.dev/docs/kit/hooks#Server-hooks-handleValidationError) server hook, which, like [`handleError`](https://svelte.dev/docs/kit/hooks#Shared-hooks-handleError), must return an [`App.Error`](https://svelte.dev/docs/kit/errors#Type-safety) (which defaults to `{ message: string }`):

If you know what you’re doing and want to opt out of validation, you can pass the string `'unchecked'` in place of a schema:

data.remote

```typescript
import { query } from '$app/server';

export const getStuff = query('unchecked', async ({ id }: { id: string }) => {
// the shape might not actually be what TypeScript thinks
// since bad actors might call this function with other arguments
});
```

## Using getRequestEvent[](https://svelte.dev/docs/kit/remote-functions#Using-getRequestEvent)

Inside `query`, `form` and `command` you can use [`getRequestEvent`](https://svelte.dev/docs/kit/$app-server#getRequestEvent) to get the current [`RequestEvent`](https://svelte.dev/docs/kit/@sveltejs-kit#RequestEvent) object. This makes it easy to build abstractions for interacting with cookies, for example:

user.remote

```csharp
import { getRequestEvent, query } from '$app/server';
import { findUser } from '$lib/server/database';

export const getProfile = query(async () => {
const user = await getUser();

return {
name: user.name,
avatar: user.avatar
};
});

// this query could be called from multiple places, but
// the function will only run once per request
const getUser = query(async () => {
const { cookies } = getRequestEvent();

return await findUser(cookies.get('session_id'));
});
```

Note that some properties of `RequestEvent` are different inside remote functions:

-   you cannot set headers (other than writing cookies, and then only inside `form` and `command` functions)
-   `route`, `params` and `url` relate to the page the remote function was called from, _not_ the URL of the endpoint SvelteKit creates for the remote function. Queries are not re-run when the user navigates (unless the argument to the query changes as a result of navigation), and so you should be mindful of how you use these values. In particular, never use them to determine whether or not a user is authorized to access certain data.

## Redirects[](https://svelte.dev/docs/kit/remote-functions#Redirects)

Inside `query`, `form` and `prerender` functions it is possible to use the [`redirect(...)`](https://svelte.dev/docs/kit/@sveltejs-kit#redirect) function. It is _not_ possible inside `command` functions, as you should avoid redirecting here. (If you absolutely have to, you can return a `{ redirect: location }` object and deal with it in the client.)