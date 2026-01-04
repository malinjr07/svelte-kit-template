Throughout this documentation, you’ll see references to the standard [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) that SvelteKit builds on top of. Rather than reinventing the wheel, we _use the platform_, which means your existing web development skills are applicable to SvelteKit. Conversely, time spent learning SvelteKit will help you be a better web developer elsewhere.

These APIs are available in all modern browsers and in many non-browser environments like Cloudflare Workers, Deno, and Vercel Functions. During development, and in [adapters](https://svelte.dev/docs/kit/adapters) for Node-based environments (including AWS Lambda), they’re made available via polyfills where necessary (for now, that is — Node is rapidly adding support for more web standards).

In particular, you’ll get comfortable with the following:

## Fetch APIs[](https://svelte.dev/docs/kit/web-standards#Fetch-APIs)

SvelteKit uses [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for getting data from the network. It’s available in [hooks](https://svelte.dev/docs/kit/hooks) and [server routes](https://svelte.dev/docs/kit/routing#server) as well as in the browser.

> A special version of `fetch` is available in [`load`](https://svelte.dev/docs/kit/load) functions, [server hooks](https://svelte.dev/docs/kit/hooks#Server-hooks) and [API routes](https://svelte.dev/docs/kit/routing#server) for invoking endpoints directly during server-side rendering, without making an HTTP call, while preserving credentials. (To make credentialled fetches in server-side code outside `load`, you must explicitly pass `cookie` and/or `authorization` headers.) It also allows you to make relative requests, whereas server-side `fetch` normally requires a fully qualified URL.

Besides `fetch` itself, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) includes the following interfaces:

### Request[](https://svelte.dev/docs/kit/web-standards#Fetch-APIs-Request)

An instance of [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) is accessible in [hooks](https://svelte.dev/docs/kit/hooks) and [server routes](https://svelte.dev/docs/kit/routing#server) as `event.request`. It contains useful methods like `request.json()` and `request.formData()` for getting data that was posted to an endpoint.

### Response[](https://svelte.dev/docs/kit/web-standards#Fetch-APIs-Response)

An instance of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) is returned from `await fetch(...)` and handlers in `+server.js` files. Fundamentally, a SvelteKit app is a machine for turning a `Request` into a `Response`.

The [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) interface allows you to read incoming `request.headers` and set outgoing `response.headers`. For example, you can get the `request.headers` as shown below, and use the [`json` convenience function](https://svelte.dev/docs/kit/@sveltejs-kit#json) to send modified `response.headers`:

src/routes/what-is-my-user-agent/+server

## FormData[](https://svelte.dev/docs/kit/web-standards#FormData)

When dealing with HTML native form submissions you’ll be working with [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) objects.

## Stream APIs[](https://svelte.dev/docs/kit/web-standards#Stream-APIs)

Most of the time, your endpoints will return complete data, as in the `userAgent` example above. Sometimes, you may need to return a response that’s too large to fit in memory in one go, or is delivered in chunks, and for this the platform provides [streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) — [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), [WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) and [TransformStream](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream).

## URL APIs[](https://svelte.dev/docs/kit/web-standards#URL-APIs)

URLs are represented by the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) interface, which includes useful properties like `origin` and `pathname` (and, in the browser, `hash`). This interface shows up in various places — `event.url` in [hooks](https://svelte.dev/docs/kit/hooks) and [server routes](https://svelte.dev/docs/kit/routing#server), [`page.url`](https://svelte.dev/docs/kit/$app-state) in [pages](https://svelte.dev/docs/kit/routing#page), `from` and `to` in [`beforeNavigate` and `afterNavigate`](https://svelte.dev/docs/kit/$app-navigation) and so on.

### URLSearchParams[](https://svelte.dev/docs/kit/web-standards#URL-APIs-URLSearchParams)

Wherever you encounter a URL, you can access query parameters via `url.searchParams`, which is an instance of [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams):

```csharp
const foo = url.searchParams.get('foo');
```

## Web Crypto[](https://svelte.dev/docs/kit/web-standards#Web-Crypto)

The [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) is made available via the `crypto` global. It’s used internally for [Content Security Policy](https://svelte.dev/docs/kit/configuration#csp) headers, but you can also use it for things like generating UUIDs:

```cpp
const uuid = crypto.randomUUID();
```