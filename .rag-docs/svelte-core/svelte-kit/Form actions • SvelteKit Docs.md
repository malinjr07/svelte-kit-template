A `+page.server.js` file can export _actions_, which allow you to `POST` data to the server using the `<form>` element.

When using `<form>`, client-side JavaScript is optional, but you can easily _progressively enhance_ your form interactions with JavaScript to provide the best user experience.

## Default actions[](https://svelte.dev/docs/kit/form-actions#Default-actions)

In the simplest case, a page declares a `default` action:

src/routes/login/+page.server

To invoke this action from the `/login` page, just add a `<form>` — no JavaScript needed:

src/routes/login/+page

```php-template
<form method="POST">
<label>
Email
<input name="email" type="email">
</label>
<label>
Password
<input name="password" type="password">
</label>
<button>Log in</button>
</form>
```

If someone were to click the button, the browser would send the form data via `POST` request to the server, running the default action.

> Actions always use `POST` requests, since `GET` requests should never have side-effects.

We can also invoke the action from other pages (for example if there’s a login widget in the nav in the root layout) by adding the `action` attribute, pointing to the page:

src/routes/+layout

```php-template
<form method="POST" action="/login">
<!-- content -->
</form>
```

## Named actions[](https://svelte.dev/docs/kit/form-actions#Named-actions)

Instead of one `default` action, a page can have as many named actions as it needs:

src/routes/login/+page.server

To invoke a named action, add a query parameter with the name prefixed by a `/` character:

src/routes/login/+page

```php-template
<form method="POST" action="?/register">
```

src/routes/+layout

```php-template
<form method="POST" action="/login?/register">
```

As well as the `action` attribute, we can use the `formaction` attribute on a button to `POST` the same form data to a different action than the parent `<form>`:

src/routes/login/+page

```php-template
<form method="POST" action="?/login">
<label>
Email
<input name="email" type="email">
</label>
<label>
Password
<input name="password" type="password">
</label>
<button>Log in</button>
<button formaction="?/register">Register</button>
</form>
```

> We can’t have default actions next to named actions, because if you POST to a named action without a redirect, the query parameter is persisted in the URL, which means the next default POST would go through the named action from before.

## Anatomy of an action[](https://svelte.dev/docs/kit/form-actions#Anatomy-of-an-action)

Each action receives a `RequestEvent` object, allowing you to read the data with `request.formData()`. After processing the request (for example, logging the user in by setting a cookie), the action can respond with data that will be available through the `form` property on the corresponding page and through `page.form` app-wide until the next update.

src/routes/login/+page.server

> Legacy mode
> 
> `PageProps` was added in 2.16.0. In earlier versions, you had to type the `data` and `form` properties individually:
> 
> In Svelte 4, you’d use `export let data` and `export let form` instead to declare properties.

### Validation errors[](https://svelte.dev/docs/kit/form-actions#Anatomy-of-an-action-Validation-errors)

If the request couldn’t be processed because of invalid data, you can return validation errors — along with the previously submitted form values — back to the user so that they can try again. The `fail` function lets you return an HTTP status code (typically 400 or 422, in the case of validation errors) along with the data. The status code is available through `page.status` and the data through `form`:

src/routes/login/+page.server

> Note that as a precaution, we only return the email back to the page — not the password.

src/routes/login/+page

```php-template
<form method="POST" action="?/login">
{#if form?.missing}<p class="error">The email field is required</p>{/if}
{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
<label>
Email
<input name="email" type="email" value={form?.email ?? ''}>
</label>
<label>
Password
<input name="password" type="password">
</label>
<button>Log in</button>
<button formaction="?/register">Register</button>
</form>
```

The returned data must be serializable as JSON. Beyond that, the structure is entirely up to you. For example, if you had multiple forms on the page, you could distinguish which `<form>` the returned `form` data referred to with an `id` property or similar.

### Redirects[](https://svelte.dev/docs/kit/form-actions#Anatomy-of-an-action-Redirects)

Redirects (and errors) work exactly the same as in [`load`](https://svelte.dev/docs/kit/load#Redirects):

src/routes/login/+page.server

## Loading data[](https://svelte.dev/docs/kit/form-actions#Loading-data)

After an action runs, the page will be re-rendered (unless a redirect or an unexpected error occurs), with the action’s return value available to the page as the `form` prop. This means that your page’s `load` functions will run after the action completes.

Note that `handle` runs before the action is invoked, and does not rerun before the `load` functions. This means that if, for example, you use `handle` to populate `event.locals` based on a cookie, you must update `event.locals` when you set or delete the cookie in an action:

src/routes/account/+page.server

## Progressive enhancement[](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement)

In the preceding sections we built a `/login` action that [works without client-side JavaScript](https://kryogenix.org/code/browser/everyonehasjs.html) — not a `fetch` in sight. That’s great, but when JavaScript _is_ available we can progressively enhance our form interactions to provide a better user experience.

### use:enhance[](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-use:enhance)

The easiest way to progressively enhance a form is to add the `use:enhance` action:

> `use:enhance` can only be used with forms that have `method="POST"` and point to actions defined in a `+page.server.js` file. It will not work with `method="GET"`, which is the default for forms without a specified method. Attempting to use `use:enhance` on forms without `method="POST"` or posting to a `+server.js` endpoint will result in an error.

> Yes, it’s a little confusing that the `enhance` action and `<form action>` are both called ‘action’. These docs are action-packed. Sorry.

Without an argument, `use:enhance` will emulate the browser-native behaviour, just without the full-page reloads. It will:

-   update the `form` property, `page.form` and `page.status` on a successful or invalid response, but only if the action is on the same page you’re submitting from. For example, if your form looks like `<form action="/somewhere/else" ..>`, the `form` prop and the `page.form` state will _not_ be updated. This is because in the native form submission case you would be redirected to the page the action is on. If you want to have them updated either way, use [`applyAction`](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-Customising-use:enhance)
-   reset the `<form>` element
-   invalidate all data using `invalidateAll` on a successful response
-   call `goto` on a redirect response
-   render the nearest `+error` boundary if an error occurs
-   [reset focus](https://svelte.dev/docs/kit/accessibility#Focus-management) to the appropriate element

### Customising use:enhance[](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-Customising-use:enhance)

To customise the behaviour, you can provide a `SubmitFunction` that runs immediately before the form is submitted, and (optionally) returns a callback that runs with the `ActionResult`.

```javascript
<form
method="POST"
use:enhance={({ formElement, formData, action, cancel, submitter }) => {
// `formElement` is this `<form>` element
// `formData` is its `FormData` object that's about to be submitted
// `action` is the URL to which the form is posted
// calling `cancel()` will prevent the submission
// `submitter` is the `HTMLElement` that caused the form to be submitted

return async ({ result, update }) => {
// `result` is an `ActionResult` object
// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
};
}}
>
```

You can use these functions to show and hide loading UI, and so on.

If you return a callback, you override the default post-submission behavior. To get it back, call `update`, which accepts `invalidateAll` and `reset` parameters, or use `applyAction` on the result:

The behaviour of `applyAction(result)` depends on `result.type`:

-   `success`, `failure` — sets `page.status` to `result.status` and updates `form` and `page.form` to `result.data` (regardless of where you are submitting from, in contrast to `update` from `enhance`)
-   `redirect` — calls `goto(result.location, { invalidateAll: true })`
-   `error` — renders the nearest `+error` boundary with `result.error`

In all cases, [focus will be reset](https://svelte.dev/docs/kit/accessibility#Focus-management).

### Custom event listener[](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-Custom-event-listener)

We can also implement progressive enhancement ourselves, without `use:enhance`, with a normal event listener on the `<form>`:

Note that you need to `deserialize` the response before processing it further using the corresponding method from `$app/forms`. `JSON.parse()` isn’t enough because form actions - like `load` functions - also support returning `Date` or `BigInt` objects.

If you have a `+server.js` alongside your `+page.server.js`, `fetch` requests will be routed there by default. To `POST` to an action in `+page.server.js` instead, use the custom `x-sveltekit-action` header:

```perl
const response = await fetch(this.action, {
method: 'POST',
body: data,
headers: {
'x-sveltekit-action': 'true'
}
});
```

## Alternatives[](https://svelte.dev/docs/kit/form-actions#Alternatives)

Form actions are the preferred way to send data to the server, since they can be progressively enhanced, but you can also use [`+server.js`](https://svelte.dev/docs/kit/routing#server) files to expose (for example) a JSON API. Here’s how such an interaction could look like:

src/routes/send-message/+page

src/routes/api/ci/+server

## GET vs POST[](https://svelte.dev/docs/kit/form-actions#GET-vs-POST)

As we’ve seen, to invoke a form action you must use `method="POST"`.

Some forms don’t need to `POST` data to the server — search inputs, for example. For these you can use `method="GET"` (or, equivalently, no `method` at all), and SvelteKit will treat them like `<a>` elements, using the client-side router instead of a full page navigation:

```php-template
<form action="/search">
<label>
Search
<input name="q">
</label>
</form>
```

Submitting this form will navigate to `/search?q=...` and invoke your load function but will not invoke an action. As with `<a>` elements, you can set the [`data-sveltekit-reload`](https://svelte.dev/docs/kit/link-options#data-sveltekit-reload), [`data-sveltekit-replacestate`](https://svelte.dev/docs/kit/link-options#data-sveltekit-replacestate), [`data-sveltekit-keepfocus`](https://svelte.dev/docs/kit/link-options#data-sveltekit-keepfocus) and [`data-sveltekit-noscroll`](https://svelte.dev/docs/kit/link-options#data-sveltekit-noscroll) attributes on the `<form>` to control the router’s behaviour.

## Further reading[](https://svelte.dev/docs/kit/form-actions#Further-reading)

-   [Tutorial: Forms](https://svelte.dev/tutorial/kit/the-form-element)