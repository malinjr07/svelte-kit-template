‘Hooks’ are app-wide functions you declare that SvelteKit will call in response to specific events, giving you fine-grained control over the framework’s behaviour.

There are three hooks files, all optional:

-   `src/hooks.server.js` — your app’s server hooks
-   `src/hooks.client.js` — your app’s client hooks
-   `src/hooks.js` — your app’s hooks that run on both the client and server

Code in these modules will run when the application starts up, making them useful for initializing database clients and so on.

> You can configure the location of these files with [`config.kit.files.hooks`](https://svelte.dev/docs/kit/configuration#files).

## Server hooks[](https://svelte.dev/docs/kit/hooks#Server-hooks)

The following hooks can be added to `src/hooks.server.js`:

### handle[](https://svelte.dev/docs/kit/hooks#Server-hooks-handle)

This function runs every time the SvelteKit server receives a [request](https://svelte.dev/docs/kit/web-standards#Fetch-APIs-Request) — whether that happens while the app is running, or during [prerendering](https://svelte.dev/docs/kit/page-options#prerender) — and determines the [response](https://svelte.dev/docs/kit/web-standards#Fetch-APIs-Response). It receives an `event` object representing the request and a function called `resolve`, which renders the route and generates a `Response`. This allows you to modify response headers or bodies, or bypass SvelteKit entirely (for implementing routes programmatically, for example).

> Requests for static assets — which includes pages that were already prerendered — are _not_ handled by SvelteKit.

If unimplemented, defaults to `({ event, resolve }) => resolve(event)`.

During prerendering, SvelteKit crawls your pages for links and renders each route it finds. Rendering the route invokes the `handle` function (and all other route dependencies, like `load`). If you need to exclude some code from running during this phase, check that the app is not [`building`](https://svelte.dev/docs/kit/$app-environment#building) beforehand.

### locals[](https://svelte.dev/docs/kit/hooks#Server-hooks-locals)

To add custom data to the request, which is passed to handlers in `+server.js` and server `load` functions, populate the `event.locals` object, as shown below.

You can define multiple `handle` functions and execute them with [the `sequence` helper function](https://svelte.dev/docs/kit/@sveltejs-kit-hooks).

`resolve` also supports a second, optional parameter that gives you more control over how the response will be rendered. That parameter is an object that can have the following fields:

-   `transformPageChunk(opts: { html: string, done: boolean }): MaybePromise<string | undefined>` — applies custom transforms to HTML. If `done` is true, it’s the final chunk. Chunks are not guaranteed to be well-formed HTML (they could include an element’s opening tag but not its closing tag, for example) but they will always be split at sensible boundaries such as `%sveltekit.head%` or layout/page components.
-   `filterSerializedResponseHeaders(name: string, value: string): boolean` — determines which headers should be included in serialized responses when a `load` function loads a resource with `fetch`. By default, none will be included.
-   `preload(input: { type: 'js' | 'css' | 'font' | 'asset', path: string }): boolean` — determines what files should be added to the `<head>` tag to preload it. The method is called with each file that was found at build time while constructing the code chunks — so if you for example have `import './styles.css` in your `+page.svelte`, `preload` will be called with the resolved path to that CSS file when visiting that page. Note that in dev mode `preload` is _not_ called, since it depends on analysis that happens at build time. Preloading can improve performance by downloading assets sooner, but it can also hurt if too much is downloaded unnecessarily. By default, `js` and `css` files will be preloaded. `asset` files are not preloaded at all currently, but we may add this later after evaluating feedback.

Note that `resolve(...)` will never throw an error, it will always return a `Promise<Response>` with the appropriate status code. If an error is thrown elsewhere during `handle`, it is treated as fatal, and SvelteKit will respond with a JSON representation of the error or a fallback error page — which can be customised via `src/error.html` — depending on the `Accept` header. You can read more about error handling [here](https://svelte.dev/docs/kit/errors).

### handleFetch[](https://svelte.dev/docs/kit/hooks#Server-hooks-handleFetch)

This function allows you to modify (or replace) the result of an [`event.fetch`](https://svelte.dev/docs/kit/load#Making-fetch-requests) call that runs on the server (or during prerendering) inside an endpoint, `load`, `action`, `handle`, `handleError` or `reroute`.

For example, your `load` function might make a request to a public URL like `https://api.yourapp.com` when the user performs a client-side navigation to the respective page, but during SSR it might make sense to hit the API directly (bypassing whatever proxies and load balancers sit between it and the public internet).

Requests made with `event.fetch` follow the browser’s credentials model — for same-origin requests, `cookie` and `authorization` headers are forwarded unless the `credentials` option is set to `"omit"`. For cross-origin requests, `cookie` will be included if the request URL belongs to a subdomain of the app — for example if your app is on `my-domain.com`, and your API is on `api.my-domain.com`, cookies will be included in the request.

There is one caveat: if your app and your API are on sibling subdomains — `www.my-domain.com` and `api.my-domain.com` for example — then a cookie belonging to a common parent domain like `my-domain.com` will _not_ be included, because SvelteKit has no way to know which domain the cookie belongs to. In these cases you will need to manually include the cookie using `handleFetch`:

### handleValidationError[](https://svelte.dev/docs/kit/hooks#Server-hooks-handleValidationError)

This hook is called when a remote function is called with an argument that does not match the provided [Standard Schema](https://standardschema.dev/). It must return an object matching the shape of [`App.Error`](https://svelte.dev/docs/kit/types#Error).

Say you have a remote function that expects a string as its argument ...

todos.remote

```javascript
import * as v from 'valibot';
import { query } from '$app/server';

export const getTodo = query(v.string(), (id) => {
// implementation...
});
```

...but it is called with something that doesn’t match the schema — such as a number (e.g `await getTodos(1)`) — then validation will fail, the server will respond with a [400 status code](https://http.dog/400), and the function will throw with the message ‘Bad Request’.

To customise this message and add additional properties to the error object, implement `handleValidationError`:

Be thoughtful about what information you expose here, as the most likely reason for validation to fail is that someone is sending malicious requests to your server.

The following can be added to `src/hooks.server.js` _and_ `src/hooks.client.js`:

### handleError[](https://svelte.dev/docs/kit/hooks#Shared-hooks-handleError)

If an [unexpected error](https://svelte.dev/docs/kit/errors#Unexpected-errors) is thrown during loading, rendering, or from an endpoint, this function will be called with the `error`, `event`, `status` code and `message`. This allows for two things:

-   you can log the error
-   you can generate a custom representation of the error that is safe to show to users, omitting sensitive details like messages and stack traces. The returned value, which defaults to `{ message }`, becomes the value of `$page.error`.

For errors thrown from your code (or library code called by your code) the status will be 500 and the message will be “Internal Error”. While `error.message` may contain sensitive information that should not be exposed to users, `message` is safe (albeit meaningless to the average user).

To add more information to the `$page.error` object in a type-safe way, you can customize the expected shape by declaring an `App.Error` interface (which must include `message: string`, to guarantee sensible fallback behavior). This allows you to — for example — append a tracking ID for users to quote in correspondence with your technical support staff:

src/app.d

```typescript
declare global {
namespace App {
interface Error {
message: string;
errorId: string;
}
}
}

export {};
```

> In `src/hooks.client.js`, the type of `handleError` is `HandleClientError` instead of `HandleServerError`, and `event` is a `NavigationEvent` rather than a `RequestEvent`.

This function is not called for _expected_ errors (those thrown with the [`error`](https://svelte.dev/docs/kit/@sveltejs-kit#error) function imported from `@sveltejs/kit`).

During development, if an error occurs because of a syntax error in your Svelte code, the passed in error has a `frame` property appended highlighting the location of the error.

> Make sure that `handleError` _never_ throws an error

### init[](https://svelte.dev/docs/kit/hooks#Shared-hooks-init)

This function runs once, when the server is created or the app starts in the browser, and is a useful place to do asynchronous work such as initializing a database connection.

> If your environment supports top-level await, the `init` function is really no different from writing your initialisation logic at the top level of the module, but some environments — most notably, Safari — don’t.

> In the browser, asynchronous work in `init` will delay hydration, so be mindful of what you put in there.

## Universal hooks[](https://svelte.dev/docs/kit/hooks#Universal-hooks)

The following can be added to `src/hooks.js`. Universal hooks run on both server and client (not to be confused with shared hooks, which are environment-specific).

### reroute[](https://svelte.dev/docs/kit/hooks#Universal-hooks-reroute)

This function runs before `handle` and allows you to change how URLs are translated into routes. The returned pathname (which defaults to `url.pathname`) is used to select the route and its parameters.

For example, you might have a `src/routes/[[lang]]/about/+page.svelte` page, which should be accessible as `/en/about` or `/de/ueber-uns` or `/fr/a-propos`. You could implement this with `reroute`:

The `lang` parameter will be correctly derived from the returned pathname.

Using `reroute` will _not_ change the contents of the browser’s address bar, or the value of `event.url`.

Since version 2.18, the `reroute` hook can be asynchronous, allowing it to (for example) fetch data from your backend to decide where to reroute to. Use this carefully and make sure it’s fast, as it will delay navigation otherwise. If you need to fetch data, use the `fetch` provided as an argument. It has the [same benefits](https://svelte.dev/docs/kit/load#Making-fetch-requests) as the `fetch` provided to `load` functions, with the caveat that `params` and `id` are unavailable to [`handleFetch`](https://svelte.dev/docs/kit/hooks#Server-hooks-handleFetch) because the route is not yet known.

> `reroute` is considered a pure, idempotent function. As such, it must always return the same output for the same input and not have side effects. Under these assumptions, SvelteKit caches the result of `reroute` on the client so it is only called once per unique URL.

### transport[](https://svelte.dev/docs/kit/hooks#Universal-hooks-transport)

This is a collection of _transporters_, which allow you to pass custom types — returned from `load` and form actions — across the server/client boundary. Each transporter contains an `encode` function, which encodes values on the server (or returns a falsy value for anything that isn’t an instance of the type) and a corresponding `decode` function:

## Further reading[](https://svelte.dev/docs/kit/hooks#Further-reading)

-   [Tutorial: Hooks](https://svelte.dev/tutorial/kit/handle)