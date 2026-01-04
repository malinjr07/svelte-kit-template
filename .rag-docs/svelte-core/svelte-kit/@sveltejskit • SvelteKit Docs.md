```go
import {
Server,
VERSION,
error,
fail,
invalid,
isActionFailure,
isHttpError,
isRedirect,
isValidationError,
json,
normalizeUrl,
redirect,
text
} from '@sveltejs/kit';
```

## Server[](https://svelte.dev/docs/kit/@sveltejs-kit#Server)

```javascript
constructor(manifest: SSRManifest);
```

```swift
init(options: ServerInitOptions): Promise<void>;
```

```php
respond(request: Request, options: RequestOptions): Promise<Response>;
```

## VERSION[](https://svelte.dev/docs/kit/@sveltejs-kit#VERSION)

## error[](https://svelte.dev/docs/kit/@sveltejs-kit#error)

Throws an error with a HTTP status code and an optional message. When called during request handling, this will cause SvelteKit to return an error response without invoking `handleError`. Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.

```typescript
function error(status: number, body: App.Error): never;
```

```typescript
function error(
status: number,
body?: {
message: string;
} extends App.Error
? App.Error | string | undefined
: never
): never;
```

## fail[](https://svelte.dev/docs/kit/@sveltejs-kit#fail)

Create an `ActionFailure` object. Call when form submission fails.

```javascript
function fail(status: number): ActionFailure<undefined>;
```

```r
function fail<T = undefined>(
status: number,
data: T
): ActionFailure<T>;
```

## invalid[](https://svelte.dev/docs/kit/@sveltejs-kit#invalid)

> Available since 2.47.3

Use this to throw a validation error to imperatively fail form validation. Can be used in combination with `issue` passed to form actions to create field-specific issues.

```javascript
import { invalid } from '@sveltejs/kit';
import { form } from '$app/server';
import { tryLogin } from '$lib/server/auth';
import * as v from 'valibot';

export const login = form(
v.object({ name: v.string(), _password: v.string() }),
async ({ name, _password }) => {
const success = tryLogin(name, _password);
if (!success) {
invalid('Incorrect username or password');
}

// ...
}
);
```

```php
function invalid(
...issues: (StandardSchemaV1.Issue | string)[]
): never;
```

## isActionFailure[](https://svelte.dev/docs/kit/@sveltejs-kit#isActionFailure)

Checks whether this is an action failure thrown by `fail`.

```cpp
function isActionFailure(e: unknown): e is ActionFailure;
```

## isHttpError[](https://svelte.dev/docs/kit/@sveltejs-kit#isHttpError)

Checks whether this is an error thrown by `error`.

```typescript
function isHttpError<T extends number>(
e: unknown,
status?: T
): e is HttpError_1 & {
status: T extends undefined ? never : T;
};
```

## isRedirect[](https://svelte.dev/docs/kit/@sveltejs-kit#isRedirect)

Checks whether this is a redirect thrown by `redirect`.

```cpp
function isRedirect(e: unknown): e is Redirect_1;
```

## isValidationError[](https://svelte.dev/docs/kit/@sveltejs-kit#isValidationError)

> Available since 2.47.3

Checks whether this is an validation error thrown by `invalid`.

```cpp
function isValidationError(e: unknown): e is ActionFailure;
```

## json[](https://svelte.dev/docs/kit/@sveltejs-kit#json)

Create a JSON `Response` object from the supplied data.

```cpp
function json(data: any, init?: ResponseInit): Response;
```

## normalizeUrl[](https://svelte.dev/docs/kit/@sveltejs-kit#normalizeUrl)

> Available since 2.18.0

Strips possible SvelteKit-internal suffixes and trailing slashes from the URL pathname. Returns the normalized URL as well as a method for adding the potential suffix back based on a new pathname (possibly including search) or URL.

```javascript
import { normalizeUrl } from '@sveltejs/kit';

const { url, denormalize } = normalizeUrl('/blog/post/__data.json');
console.log(url.pathname); // /blog/post
console.log(denormalize('/blog/post/a')); // /blog/post/a/__data.json
```

```typescript
function normalizeUrl(url: URL | string): {
url: URL;
wasNormalized: boolean;
denormalize: (url?: string | URL) => URL;
};
```

## redirect[](https://svelte.dev/docs/kit/@sveltejs-kit#redirect)

Redirect a request. When called during request handling, SvelteKit will return a redirect response. Make sure you’re not catching the thrown redirect, which would prevent SvelteKit from handling it.

Most common status codes:

-   `303 See Other`: redirect as a GET request (often used after a form POST request)
-   `307 Temporary Redirect`: redirect will keep the request method
-   `308 Permanent Redirect`: redirect will keep the request method, SEO will be transferred to the new page

[See all redirect status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages)

```typescript
function redirect(
status:
| 300
| 301
| 302
| 303
| 304
| 305
| 306
| 307
| 308
| ({} & number),
location: string | URL
): never;
```

## text[](https://svelte.dev/docs/kit/@sveltejs-kit#text)

Create a `Response` object from the supplied body.

```csharp
function text(body: string, init?: ResponseInit): Response;
```

## Action[](https://svelte.dev/docs/kit/@sveltejs-kit#Action)

Shape of a form action method that is part of `export const actions = {...}` in `+page.server.js`. See [form actions](https://svelte.dev/docs/kit/form-actions) for more information.

```typescript
type Action<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
OutputData extends Record<string, any> | void = Record<
string,
any
> | void,
RouteId extends AppRouteId | null = AppRouteId | null
> = (
event: RequestEvent<Params, RouteId>
) => MaybePromise<OutputData>;
```

## ActionFailure[](https://svelte.dev/docs/kit/@sveltejs-kit#ActionFailure)

```csharp
interface ActionFailure<T = undefined> {…}
```

## ActionResult[](https://svelte.dev/docs/kit/@sveltejs-kit#ActionResult)

When calling a form action via fetch, the response will be one of these shapes.

```perl
<form method="post" use:enhance={() => {
return ({ result }) => {
// result is of type ActionResult
};
}}
```

```typescript
type ActionResult<
Success extends
| Record<string, unknown>
| undefined = Record<string, any>,
Failure extends
| Record<string, unknown>
| undefined = Record<string, any>
> =
| { type: 'success'; status: number; data?: Success }
| { type: 'failure'; status: number; data?: Failure }
| { type: 'redirect'; status: number; location: string }
| { type: 'error'; status?: number; error: any };
```

## Actions[](https://svelte.dev/docs/kit/@sveltejs-kit#Actions)

Shape of the `export const actions = {...}` object in `+page.server.js`. See [form actions](https://svelte.dev/docs/kit/form-actions) for more information.

```typescript
type Actions<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
OutputData extends Record<string, any> | void = Record<
string,
any
> | void,
RouteId extends AppRouteId | null = AppRouteId | null
> = Record<string, Action<Params, OutputData, RouteId>>;
```

## Adapter[](https://svelte.dev/docs/kit/@sveltejs-kit#Adapter)

[Adapters](https://svelte.dev/docs/kit/adapters) are responsible for taking the production build and turning it into something that can be deployed to a platform of your choosing.

The name of the adapter, using for logging. Will typically correspond to the package name.

```javascript
adapt: (builder: Builder) => MaybePromise<void>;
```

-   `builder` An object provided by SvelteKit that contains methods for adapting the app

This function is called after SvelteKit has built your app.

Checks called during dev and build to determine whether specific features will work in production with this adapter.

```typescript
read?: (details: { config: any; route: { id: string } }) => boolean;
```

-   `details.config` The merged route config

Test support for `read` from `$app/server`.

```typescript
instrumentation?: () => boolean;
```

-   available since v2.31.0

Test support for `instrumentation.server.js`. To pass, the adapter must support running `instrumentation.server.js` prior to the application code.

```bash
emulate?: () => MaybePromise<Emulator>;
```

Creates an `Emulator`, which allows the adapter to influence the environment during dev, build and prerendering.

## AfterNavigate[](https://svelte.dev/docs/kit/@sveltejs-kit#AfterNavigate)

The argument passed to [`afterNavigate`](https://svelte.dev/docs/kit/$app-navigation#afterNavigate) callbacks.

```go
type AfterNavigate = (Navigation | NavigationEnter) & {
/**
 * The type of navigation:
 * - `enter`: The app has hydrated/started
 * - `form`: The user submitted a `<form method="GET">`
 * - `link`: Navigation was triggered by a link click
 * - `goto`: Navigation was triggered by a `goto(...)` call or a redirect
 * - `popstate`: Navigation was triggered by back/forward navigation
 */
type: Exclude<NavigationType, 'leave'>;
/**
 * Since `afterNavigate` callbacks are called after a navigation completes, they will never be called with a navigation that unloads the page.
 */
willUnload: false;
};
```

## AwaitedActions[](https://svelte.dev/docs/kit/@sveltejs-kit#AwaitedActions)

```swift
type AwaitedActions<
T extends Record<string, (...args: any) => any>
> = OptionalUnion<
{
[Key in keyof T]: UnpackValidationError<
Awaited<ReturnType<T[Key]>>
>;
}[keyof T]
>;
```

## BeforeNavigate[](https://svelte.dev/docs/kit/@sveltejs-kit#BeforeNavigate)

The argument passed to [`beforeNavigate`](https://svelte.dev/docs/kit/$app-navigation#beforeNavigate) callbacks.

```typescript
type BeforeNavigate = Navigation & {
/**
 * Call this to prevent the navigation from starting.
 */
cancel: () => void;
};
```

## Builder[](https://svelte.dev/docs/kit/@sveltejs-kit#Builder)

This object is passed to the `adapt` function of adapters. It contains various methods and properties that are useful for adapting the app.

Print messages to the console. `log.info` and `log.minor` are silent unless Vite’s `logLevel` is `info`.

```typescript
rimraf: (dir: string) => void;
```

Remove `dir` and all its contents.

```typescript
mkdirp: (dir: string) => void;
```

Create `dir` and any required parent directories.

The fully resolved Svelte config.

```css
prerendered: Prerendered;
```

Information about prerendered pages and assets, if any.

```css
routes: RouteDefinition[];
```

An array of all routes (including prerendered)

```javascript
createEntries: (fn: (route: RouteDefinition) => AdapterEntry) => Promise<void>;
```

-   `fn` A function that groups a set of routes into an entry point
-   deprecated Use `builder.routes` instead

Create separate functions that map to one or more routes of your app.

```typescript
findServerAssets: (routes: RouteDefinition[]) => string[];
```

Find all the assets imported by server files belonging to `routes`

```typescript
generateFallback: (dest: string) => Promise<void>;
```

Generate a fallback page for a static webserver to use when no route is matched. Useful for single-page apps.

```javascript
generateEnvModule: () => void;
```

Generate a module exposing build-time environment variables as `$env/dynamic/public`.

```typescript
generateManifest: (opts: { relativePath: string; routes?: RouteDefinition[] }) => string;
```

-   `opts` a relative path to the base directory of the app and optionally in which format (esm or cjs) the manifest should be generated

Generate a server-side manifest to initialise the SvelteKit [server](https://svelte.dev/docs/kit/@sveltejs-kit#Server) with.

```typescript
getBuildDirectory: (name: string) => string;
```

-   `name` path to the file, relative to the build directory

Resolve a path to the `name` directory inside `outDir`, e.g. `/path/to/.svelte-kit/my-adapter`.

```typescript
getClientDirectory: () => string;
```

Get the fully resolved path to the directory containing client-side assets, including the contents of your `static` directory.

```typescript
getServerDirectory: () => string;
```

Get the fully resolved path to the directory containing server-side code.

```typescript
getAppPath: () => string;
```

Get the application path including any configured `base` path, e.g. `my-base-path/_app`.

```typescript
writeClient: (dest: string) => string[];
```

-   `dest` the destination folder
-   returns an array of files written to `dest`

Write client assets to `dest`.

```typescript
writePrerendered: (dest: string) => string[];
```

-   `dest` the destination folder
-   returns an array of files written to `dest`

Write prerendered files to `dest`.

```typescript
writeServer: (dest: string) => string[];
```

-   `dest` the destination folder
-   returns an array of files written to `dest`

Write server-side code to `dest`.

```typescript
copy: (
from: string,
to: string,
opts?: {
filter?(basename: string): boolean;
replace?: Record<string, string>;
}
) => string[];
```

-   `from` the source file or directory
-   `to` the destination file or directory
-   `opts.filter` a function to determine whether a file or directory should be copied
-   `opts.replace` a map of strings to replace
-   returns an array of files that were copied

Copy a file or directory.

```typescript
hasServerInstrumentationFile: () => boolean;
```

-   returns true if the server instrumentation file exists, false otherwise
-   available since v2.31.0

Check if the server instrumentation file exists.

```typescript
instrument: (args: {
entrypoint: string;
instrumentation: string;
start?: string;
module?:
| {
exports: string[];
  }
| {
generateText: (args: { instrumentation: string; start: string }) => string;
  };
}) => void;
```

-   `options` an object containing the following properties:
-   `options.entrypoint` the path to the entrypoint to trace.
-   `options.instrumentation` the path to the instrumentation file.
-   `options.start` the name of the start file. This is what `entrypoint` will be renamed to.
-   `options.module` configuration for the resulting entrypoint module.
-   `options.module.generateText` a function that receives the relative paths to the instrumentation and start files, and generates the text of the module to be traced. If not provided, the default implementation will be used, which uses top-level await.
-   available since v2.31.0

Instrument `entrypoint` with `instrumentation`.

Renames `entrypoint` to `start` and creates a new module at `entrypoint` which imports `instrumentation` and then dynamically imports `start`. This allows the module hooks necessary for instrumentation libraries to be loaded prior to any application code.

Caveats:

-   “Live exports” will not work. If your adapter uses live exports, your users will need to manually import the server instrumentation on startup.
-   If `tla` is `false`, OTEL auto-instrumentation may not work properly. Use it if your environment supports it.
-   Use `hasServerInstrumentationFile` to check if the user has a server instrumentation file; if they don’t, you shouldn’t do this.

```typescript
compress: (directory: string) => Promise<void>;
```

-   `directory` The directory containing the files to be compressed

Compress files in `directory` with gzip and brotli, where appropriate. Generates `.gz` and `.br` files alongside the originals.

## ClientInit[](https://svelte.dev/docs/kit/@sveltejs-kit#ClientInit)

> Available since 2.10.0

The [`init`](https://svelte.dev/docs/kit/hooks#Shared-hooks-init) will be invoked once the app starts in the browser

```typescript
type ClientInit = () => MaybePromise<void>;
```

## Config[](https://svelte.dev/docs/kit/@sveltejs-kit#Config)

See the [configuration reference](https://svelte.dev/docs/kit/configuration) for details.

## Cookies[](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies)

```typescript
get: (name: string, opts?: import('cookie').CookieParseOptions) => string | undefined;
```

-   `name` the name of the cookie
-   `opts` the options, passed directly to `cookie.parse`. See documentation [here](https://github.com/jshttp/cookie#cookieparsestr-options)

Gets a cookie that was previously set with `cookies.set`, or from the request headers.

```typescript
getAll: (opts?: import('cookie').CookieParseOptions) => Array<{ name: string; value: string }>;
```

-   `opts` the options, passed directly to `cookie.parse`. See documentation [here](https://github.com/jshttp/cookie#cookieparsestr-options)

Gets all cookies that were previously set with `cookies.set`, or from the request headers.

```typescript
set: (
name: string,
value: string,
opts: import('cookie').CookieSerializeOptions & { path: string }
) => void;
```

-   `name` the name of the cookie
-   `value` the cookie value
-   `opts` the options, passed directly to `cookie.serialize`. See documentation [here](https://github.com/jshttp/cookie#cookieserializename-value-options)

Sets a cookie. This will add a `set-cookie` header to the response, but also make the cookie available via `cookies.get` or `cookies.getAll` during the current request.

The `httpOnly` and `secure` options are `true` by default (except on [http://localhost](http://localhost/), where `secure` is `false`), and must be explicitly disabled if you want cookies to be readable by client-side JavaScript and/or transmitted over HTTP. The `sameSite` option defaults to `lax`.

You must specify a `path` for the cookie. In most cases you should explicitly set `path: '/'` to make the cookie available throughout your app. You can use relative paths, or set `path: ''` to make the cookie only available on the current path and its children

```typescript
delete: (name: string, opts: import('cookie').CookieSerializeOptions & { path: string }) => void;
```

-   `name` the name of the cookie
-   `opts` the options, passed directly to `cookie.serialize`. The `path` must match the path of the cookie you want to delete. See documentation [here](https://github.com/jshttp/cookie#cookieserializename-value-options)

Deletes a cookie by setting its value to an empty string and setting the expiry date in the past.

You must specify a `path` for the cookie. In most cases you should explicitly set `path: '/'` to make the cookie available throughout your app. You can use relative paths, or set `path: ''` to make the cookie only available on the current path and its children

```typescript
serialize: (
name: string,
value: string,
opts: import('cookie').CookieSerializeOptions & { path: string }
) => string;
```

-   `name` the name of the cookie
-   `value` the cookie value
-   `opts` the options, passed directly to `cookie.serialize`. See documentation [here](https://github.com/jshttp/cookie#cookieserializename-value-options)

Serialize a cookie name-value pair into a `Set-Cookie` header string, but don’t apply it to the response.

The `httpOnly` and `secure` options are `true` by default (except on [http://localhost](http://localhost/), where `secure` is `false`), and must be explicitly disabled if you want cookies to be readable by client-side JavaScript and/or transmitted over HTTP. The `sameSite` option defaults to `lax`.

You must specify a `path` for the cookie. In most cases you should explicitly set `path: '/'` to make the cookie available throughout your app. You can use relative paths, or set `path: ''` to make the cookie only available on the current path and its children

## Emulator[](https://svelte.dev/docs/kit/@sveltejs-kit#Emulator)

A collection of functions that influence the environment during dev, build and prerendering

```css
platform?(details: { config: any; prerender: PrerenderOption }): MaybePromise<App.Platform>;
```

A function that is called with the current route `config` and `prerender` option and returns an `App.Platform` object

## Handle[](https://svelte.dev/docs/kit/@sveltejs-kit#Handle)

The [`handle`](https://svelte.dev/docs/kit/hooks#Server-hooks-handle) hook runs every time the SvelteKit server receives a [request](https://svelte.dev/docs/kit/web-standards#Fetch-APIs-Request) and determines the [response](https://svelte.dev/docs/kit/web-standards#Fetch-APIs-Response). It receives an `event` object representing the request and a function called `resolve`, which renders the route and generates a `Response`. This allows you to modify response headers or bodies, or bypass SvelteKit entirely (for implementing routes programmatically, for example).

```typescript
type Handle = (input: {
event: RequestEvent;
resolve: (
event: RequestEvent,
opts?: ResolveOptions
) => MaybePromise<Response>;
}) => MaybePromise<Response>;
```

## HandleClientError[](https://svelte.dev/docs/kit/@sveltejs-kit#HandleClientError)

The client-side [`handleError`](https://svelte.dev/docs/kit/hooks#Shared-hooks-handleError) hook runs when an unexpected error is thrown while navigating.

If an unexpected error is thrown during loading or the following render, this function will be called with the error and the event. Make sure that this function _never_ throws an error.

```typescript
type HandleClientError = (input: {
error: unknown;
event: NavigationEvent;
status: number;
message: string;
}) => MaybePromise<void | App.Error>;
```

## HandleFetch[](https://svelte.dev/docs/kit/@sveltejs-kit#HandleFetch)

The [`handleFetch`](https://svelte.dev/docs/kit/hooks#Server-hooks-handleFetch) hook allows you to modify (or replace) the result of an [`event.fetch`](https://svelte.dev/docs/kit/load#Making-fetch-requests) call that runs on the server (or during prerendering) inside an endpoint, `load`, `action`, `handle`, `handleError` or `reroute`.

```typescript
type HandleFetch = (input: {
event: RequestEvent;
request: Request;
fetch: typeof fetch;
}) => MaybePromise<Response>;
```

## HandleServerError[](https://svelte.dev/docs/kit/@sveltejs-kit#HandleServerError)

The server-side [`handleError`](https://svelte.dev/docs/kit/hooks#Shared-hooks-handleError) hook runs when an unexpected error is thrown while responding to a request.

If an unexpected error is thrown during loading or rendering, this function will be called with the error and the event. Make sure that this function _never_ throws an error.

```typescript
type HandleServerError = (input: {
error: unknown;
event: RequestEvent;
status: number;
message: string;
}) => MaybePromise<void | App.Error>;
```

## HandleValidationError[](https://svelte.dev/docs/kit/@sveltejs-kit#HandleValidationError)

The [`handleValidationError`](https://svelte.dev/docs/kit/hooks#Server-hooks-handleValidationError) hook runs when the argument to a remote function fails validation.

It will be called with the validation issues and the event, and must return an object shape that matches `App.Error`.

```typescript
type HandleValidationError<
Issue extends
StandardSchemaV1.Issue = StandardSchemaV1.Issue
> = (input: {
issues: Issue[];
event: RequestEvent;
}) => MaybePromise<App.Error>;
```

## HttpError[](https://svelte.dev/docs/kit/@sveltejs-kit#HttpError)

The object returned by the [`error`](https://svelte.dev/docs/kit/@sveltejs-kit#error) function.

The content of the error.

## InvalidField[](https://svelte.dev/docs/kit/@sveltejs-kit#InvalidField)

A function and proxy object used to imperatively create validation errors in form handlers.

Access properties to create field-specific issues: `issue.fieldName('message')`. The type structure mirrors the input data structure for type-safe field access. Call `invalid(issue.foo(...), issue.nested.bar(...))` to throw a validation error.

```typescript
type InvalidField<T> =
WillRecurseIndefinitely<T> extends true
? Record<string | number, any>
: NonNullable<T> extends
| string
| number
| boolean
| File
? (message: string) => StandardSchemaV1.Issue
: NonNullable<T> extends Array<infer U>
? {
[K in number]: InvalidField<U>;
} & ((message: string) => StandardSchemaV1.Issue)
: NonNullable<T> extends RemoteFormInput
? {
[K in keyof T]-?: InvalidField<T[K]>;
} & ((
message: string
) => StandardSchemaV1.Issue)
: Record<string, never>;
```

## KitConfig[](https://svelte.dev/docs/kit/@sveltejs-kit#KitConfig)

See the [configuration reference](https://svelte.dev/docs/kit/configuration) for details.

## LessThan[](https://svelte.dev/docs/kit/@sveltejs-kit#LessThan)

```typescript
type LessThan<
TNumber extends number,
TArray extends any[] = []
> = TNumber extends TArray['length']
? TArray[number]
: LessThan<TNumber, [...TArray, TArray['length']]>;
```

## Load[](https://svelte.dev/docs/kit/@sveltejs-kit#Load)

The generic form of `PageLoad` and `LayoutLoad`. You should import those from `./$types` (see [generated types](https://svelte.dev/docs/kit/types#Generated-types)) rather than using `Load` directly.

```typescript
type Load<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
InputData extends Record<string, unknown> | null = Record<
string,
any
> | null,
ParentData extends Record<string, unknown> = Record<
string,
any
>,
OutputData extends Record<
string,
unknown
> | void = Record<string, any> | void,
RouteId extends AppRouteId | null = AppRouteId | null
> = (
event: LoadEvent<Params, InputData, ParentData, RouteId>
) => MaybePromise<OutputData>;
```

## LoadEvent[](https://svelte.dev/docs/kit/@sveltejs-kit#LoadEvent)

The generic form of `PageLoadEvent` and `LayoutLoadEvent`. You should import those from `./$types` (see [generated types](https://svelte.dev/docs/kit/types#Generated-types)) rather than using `LoadEvent` directly.

```typescript
interface LoadEvent<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
Data extends Record<string, unknown> | null = Record<
string,
any
> | null,
ParentData extends Record<string, unknown> = Record<
string,
any
>,
RouteId extends AppRouteId | null = AppRouteId | null
> extends NavigationEvent<Params, RouteId> {…}
```

`fetch` is equivalent to the [native `fetch` web API](https://developer.mozilla.org/en-US/docs/Web/API/fetch), with a few additional features:

-   It can be used to make credentialed requests on the server, as it inherits the `cookie` and `authorization` headers for the page request.
-   It can make relative requests on the server (ordinarily, `fetch` requires a URL with an origin when used in a server context).
-   Internal requests (e.g. for `+server.js` routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
-   During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the `text` and `json` methods of the `Response` object. Note that headers will _not_ be serialized, unless explicitly included via [`filterSerializedResponseHeaders`](https://svelte.dev/docs/kit/hooks#Server-hooks-handle)
-   During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request.

You can learn more about making credentialed requests with cookies [here](https://svelte.dev/docs/kit/load#Cookies)

Contains the data returned by the route’s server `load` function (in `+layout.server.js` or `+page.server.js`), if any.

```typescript
setHeaders: (headers: Record<string, string>) => void;
```

If you need to set headers for the response, you can do so using the this method. This is useful if you want the page to be cached, for example:

src/routes/blog/+page

```javascript
export async function load({ fetch, setHeaders }) {

const url = `https://cms.example.com/articles.json`;
const response = await fetch(url);

setHeaders({
age: response.headers.get('age'),
'cache-control': response.headers.get('cache-control')
});

return response.json();
}
```

Setting the same header multiple times (even in separate `load` functions) is an error — you can only set a given header once.

You cannot add a `set-cookie` header with `setHeaders` — use the [`cookies`](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies) API in a server-only `load` function instead.

`setHeaders` has no effect when a `load` function runs in the browser.

```javascript
parent: () => Promise<ParentData>;
```

`await parent()` returns data from parent `+layout.js` `load` functions. Implicitly, a missing `+layout.js` is treated as a `({ data }) => data` function, meaning that it will return and forward data from parent `+layout.server.js` files.

Be careful not to introduce accidental waterfalls when using `await parent()`. If for example you only want to merge parent data into the returned output, call it _after_ fetching your other data.

```typescript
depends: (...deps: Array<`${string}:${string}`>) => void;
```

This function declares that the `load` function has a _dependency_ on one or more URLs or custom identifiers, which can subsequently be used with [`invalidate()`](https://svelte.dev/docs/kit/$app-navigation#invalidate) to cause `load` to rerun.

Most of the time you won’t need this, as `fetch` calls `depends` on your behalf — it’s only necessary if you’re using a custom API client that bypasses `fetch`.

URLs can be absolute or relative to the page being loaded, and must be [encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding).

Custom identifiers have to be prefixed with one or more lowercase letters followed by a colon to conform to the [URI specification](https://www.rfc-editor.org/rfc/rfc3986.html).

The following example shows how to use `depends` to register a dependency on a custom identifier, which is `invalidate`d after a button click, making the `load` function rerun.

src/routes/+page

```javascript
let count = 0;
export async function load({ depends }) {
depends('increase:count');

return { count: count++ };
}
```

src/routes/+page

```php-template
<script>
import { invalidate } from '$app/navigation';

let { data } = $props();

const increase = async () => {
await invalidate('increase:count');
}
</script>

<p>{data.count}<p>
<button on:click={increase}>Increase Count</button>
```

```javascript
untrack: <T>(fn: () => T) => T;
```

Use this function to opt out of dependency tracking for everything that is synchronously called within the callback. Example:

src/routes/+page.server

```javascript
export async function load({ untrack, url }) {

// Untrack url.pathname so that path changes don't trigger a rerun
if (untrack(() => url.pathname === '/')) {
return { message: 'Welcome!' };
}
}
```

-   available since v2.31.0

Access to spans for tracing. If tracing is not enabled or the function is being run in the browser, these spans will do nothing.

Whether tracing is enabled.

The root span for the request. This span is named `sveltekit.handle.root`.

The span associated with the current `load` function.

## LoadProperties[](https://svelte.dev/docs/kit/@sveltejs-kit#LoadProperties)

```typescript
type LoadProperties<
input extends Record<string, any> | void
> = input extends void
? undefined // needs to be undefined, because void will break intellisense
: input extends Record<string, any>
? input
: unknown;
```

## Navigation[](https://svelte.dev/docs/kit/@sveltejs-kit#Navigation)

```bash
type Navigation =
| NavigationExternal
| NavigationFormSubmit
| NavigationPopState
| NavigationLink;
```

## NavigationBase[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationBase)

```kotlin
interface NavigationBase {…}
```

```csharp
from: NavigationTarget | null;
```

Where navigation was triggered from

```css
to: NavigationTarget | null;
```

Where navigation is going to/has gone to

Whether or not the navigation will result in the page being unloaded (i.e. not a client-side navigation)

A promise that resolves once the navigation is complete, and rejects if the navigation fails or is aborted. In the case of a `willUnload` navigation, the promise will never resolve

## NavigationEnter[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationEnter)

```java
interface NavigationEnter extends NavigationBase {…}
```

The type of navigation:

-   `form`: The user submitted a `<form method="GET">`
-   `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
-   `link`: Navigation was triggered by a link click
-   `goto`: Navigation was triggered by a `goto(...)` call or a redirect
-   `popstate`: Navigation was triggered by back/forward navigation

In case of a history back/forward navigation, the number of steps to go back/forward

Dispatched `Event` object when navigation occured by `popstate` or `link`.

## NavigationEvent[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationEvent)

```java
interface NavigationEvent<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
RouteId extends AppRouteId | null = AppRouteId | null
> {…}
```

The parameters of the current page - e.g. for a route like `/blog/[slug]`, a `{ slug: string }` object

Info about the current route

The ID of the current route - e.g. for `src/routes/blog/[slug]`, it would be `/blog/[slug]`. It is `null` when no route is matched.

The URL of the current page

## NavigationExternal[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationExternal)

```java
interface NavigationExternal extends NavigationBase {…}
```

```bash
type: Exclude<NavigationType, 'enter' | 'popstate' | 'link' | 'form'>;
```

The type of navigation:

-   `form`: The user submitted a `<form method="GET">`
-   `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
-   `link`: Navigation was triggered by a link click
-   `goto`: Navigation was triggered by a `goto(...)` call or a redirect
-   `popstate`: Navigation was triggered by back/forward navigation

In case of a history back/forward navigation, the number of steps to go back/forward

## NavigationFormSubmit[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationFormSubmit)

```java
interface NavigationFormSubmit extends NavigationBase {…}
```

The type of navigation:

-   `form`: The user submitted a `<form method="GET">`
-   `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
-   `link`: Navigation was triggered by a link click
-   `goto`: Navigation was triggered by a `goto(...)` call or a redirect
-   `popstate`: Navigation was triggered by back/forward navigation

The `SubmitEvent` that caused the navigation

In case of a history back/forward navigation, the number of steps to go back/forward

## NavigationLink[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationLink)

```java
interface NavigationLink extends NavigationBase {…}
```

The type of navigation:

-   `form`: The user submitted a `<form method="GET">`
-   `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
-   `link`: Navigation was triggered by a link click
-   `goto`: Navigation was triggered by a `goto(...)` call or a redirect
-   `popstate`: Navigation was triggered by back/forward navigation

The `PointerEvent` that caused the navigation

In case of a history back/forward navigation, the number of steps to go back/forward

## NavigationPopState[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationPopState)

```java
interface NavigationPopState extends NavigationBase {…}
```

The type of navigation:

-   `form`: The user submitted a `<form method="GET">`
-   `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
-   `link`: Navigation was triggered by a link click
-   `goto`: Navigation was triggered by a `goto(...)` call or a redirect
-   `popstate`: Navigation was triggered by back/forward navigation

In case of a history back/forward navigation, the number of steps to go back/forward

The `PopStateEvent` that caused the navigation

## NavigationTarget[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationTarget)

Information about the target of a specific navigation.

```java
interface NavigationTarget<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
RouteId extends AppRouteId | null = AppRouteId | null
> {…}
```

Parameters of the target page - e.g. for a route like `/blog/[slug]`, a `{ slug: string }` object. Is `null` if the target is not part of the SvelteKit app (could not be resolved to a route).

Info about the target route

The ID of the current route - e.g. for `src/routes/blog/[slug]`, it would be `/blog/[slug]`. It is `null` when no route is matched.

The URL that is navigated to

## NavigationType[](https://svelte.dev/docs/kit/@sveltejs-kit#NavigationType)

-   `enter`: The app has hydrated/started
-   `form`: The user submitted a `<form method="GET">`
-   `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
-   `link`: Navigation was triggered by a link click
-   `goto`: Navigation was triggered by a `goto(...)` call or a redirect
-   `popstate`: Navigation was triggered by back/forward navigation

```bash
type NavigationType =
| 'enter'
| 'form'
| 'leave'
| 'link'
| 'goto'
| 'popstate';
```

## NumericRange[](https://svelte.dev/docs/kit/@sveltejs-kit#NumericRange)

```typescript
type NumericRange<
TStart extends number,
TEnd extends number
> = Exclude<TEnd | LessThan<TEnd>, LessThan<TStart>>;
```

## OnNavigate[](https://svelte.dev/docs/kit/@sveltejs-kit#OnNavigate)

The argument passed to [`onNavigate`](https://svelte.dev/docs/kit/$app-navigation#onNavigate) callbacks.

```go
type OnNavigate = Navigation & {
/**
 * The type of navigation:
 * - `form`: The user submitted a `<form method="GET">`
 * - `link`: Navigation was triggered by a link click
 * - `goto`: Navigation was triggered by a `goto(...)` call or a redirect
 * - `popstate`: Navigation was triggered by back/forward navigation
 */
type: Exclude<NavigationType, 'enter' | 'leave'>;
/**
 * Since `onNavigate` callbacks are called immediately before a client-side navigation, they will never be called with a navigation that unloads the page.
 */
willUnload: false;
};
```

## Page[](https://svelte.dev/docs/kit/@sveltejs-kit#Page)

The shape of the [`page`](https://svelte.dev/docs/kit/$app-state#page) reactive object and the [`$page`](https://svelte.dev/docs/kit/$app-stores) store.

```java
interface Page<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
RouteId extends AppRouteId | null = AppRouteId | null
> {…}
```

```css
url: URL & { pathname: ResolvedPathname };
```

The URL of the current page.

The parameters of the current page - e.g. for a route like `/blog/[slug]`, a `{ slug: string }` object.

Info about the current route.

The ID of the current route - e.g. for `src/routes/blog/[slug]`, it would be `/blog/[slug]`. It is `null` when no route is matched.

HTTP status code of the current page.

The error object of the current page, if any. Filled from the `handleError` hooks.

```swift
data: App.PageData & Record<string, any>;
```

The merged result of all data from all `load` functions on the current page. You can type a common denominator through `App.PageData`.

The page state, which can be manipulated using the [`pushState`](https://svelte.dev/docs/kit/$app-navigation#pushState) and [`replaceState`](https://svelte.dev/docs/kit/$app-navigation#replaceState) functions from `$app/navigation`.

Filled only after a form submission. See [form actions](https://svelte.dev/docs/kit/form-actions) for more info.

## ParamMatcher[](https://svelte.dev/docs/kit/@sveltejs-kit#ParamMatcher)

The shape of a param matcher. See [matching](https://svelte.dev/docs/kit/advanced-routing#Matching) for more info.

```typescript
type ParamMatcher = (param: string) => boolean;
```

## PrerenderOption[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderOption)

```java
type PrerenderOption = boolean | 'auto';
```

## Redirect[](https://svelte.dev/docs/kit/@sveltejs-kit#Redirect)

The object returned by the [`redirect`](https://svelte.dev/docs/kit/@sveltejs-kit#redirect) function.

```css
status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;
```

The location to redirect to.

## RemoteCommand[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteCommand)

The return value of a remote `command` function. See [Remote functions](https://svelte.dev/docs/kit/remote-functions#command) for full documentation.

```swift
type RemoteCommand<Input, Output> = {
(arg: Input): Promise<Awaited<Output>> & {
updates(
...queries: Array<
RemoteQuery<any> | RemoteQueryOverride
>
): Promise<Awaited<Output>>;
};
/** The number of pending command executions */
get pending(): number;
};
```

## RemoteForm[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteForm)

The return value of a remote `form` function. See [Remote functions](https://svelte.dev/docs/kit/remote-functions#form) for full documentation.

```typescript
type RemoteForm<
Input extends RemoteFormInput | void,
Output
> = {
/** Attachment that sets up an event handler that intercepts the form submission on the client to prevent a full page reload */
[attachment: symbol]: (node: HTMLFormElement) => void;
method: 'POST';
/** The URL to send the form to. */
action: string;
/** Use the `enhance` method to influence what happens when the form is submitted. */
enhance(
callback: (opts: {
form: HTMLFormElement;
data: Input;
submit: () => Promise<void> & {
updates: (
...queries: Array<
RemoteQuery<any> | RemoteQueryOverride
>
) => Promise<void>;
};
}) => void | Promise<void>
): {
method: 'POST';
action: string;
[attachment: symbol]: (node: HTMLFormElement) => void;
};
/**
 * Create an instance of the form for the given `id`.
 * The `id` is stringified and used for deduplication to potentially reuse existing instances.
 * Useful when you have multiple forms that use the same remote form action, for example in a loop.
 * ```svelte
 * {#each todos as todo}
 *{@const todoForm = updateTodo.for(todo.id)}
 *<form {...todoForm}>
 *{#if todoForm.result?.invalid}<p>Invalid data</p>{/if}
 *...
 *</form>
 *{/each}
 * ```
 */
for(
id: ExtractId<Input>
): Omit<RemoteForm<Input, Output>, 'for'>;
/** Preflight checks */
preflight(
schema: StandardSchemaV1<Input, any>
): RemoteForm<Input, Output>;
/** Validate the form contents programmatically */
validate(options?: {
/** Set this to `true` to also show validation issues of fields that haven't been touched yet. */
includeUntouched?: boolean;
/** Set this to `true` to only run the `preflight` validation. */
preflightOnly?: boolean;
}): Promise<void>;
/** The result of the form submission */
get result(): Output | undefined;
/** The number of pending submissions */
get pending(): number;
/** Access form fields using object notation */
fields: RemoteFormFields<Input>;
/** Spread this onto a `<button>` or `<input type="submit">` */
buttonProps: {
type: 'submit';
formmethod: 'POST';
formaction: string;
onclick: (event: Event) => void;
/** Use the `enhance` method to influence what happens when the form is submitted. */
enhance(
callback: (opts: {
form: HTMLFormElement;
data: Input;
submit: () => Promise<void> & {
updates: (
...queries: Array<
RemoteQuery<any> | RemoteQueryOverride
>
) => Promise<void>;
};
}) => void | Promise<void>
): {
type: 'submit';
formmethod: 'POST';
formaction: string;
onclick: (event: Event) => void;
};
/** The number of pending submissions */
get pending(): number;
};
};
```

## RemoteFormField[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteFormField)

Form field accessor type that provides name(), value(), and issues() methods

```python
type RemoteFormField<Value extends RemoteFormFieldValue> =
RemoteFormFieldMethods<Value> & {
/**
 * Returns an object that can be spread onto an input element with the correct type attribute,
 * aria-invalid attribute if the field is invalid, and appropriate value/checked property getters/setters.
 * @example
 * ```svelte
 * <input {...myForm.fields.myString.as('text')} />
 * <input {...myForm.fields.myNumber.as('number')} />
 * <input {...myForm.fields.myBoolean.as('checkbox')} />
 * ```
 */
as<T extends RemoteFormFieldType<Value>>(
...args: AsArgs<T, Value>
): InputElementProps<T>;
};
```

## RemoteFormFieldType[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteFormFieldType)

```typescript
type RemoteFormFieldType<T> = {
[K in keyof InputTypeMap]: T extends InputTypeMap[K]
? K
: never;
}[keyof InputTypeMap];
```

## RemoteFormFieldValue[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteFormFieldValue)

```typescript
type RemoteFormFieldValue =
| string
| string[]
| number
| boolean
| File
| File[];
```

## RemoteFormFields[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteFormFields)

Recursive type to build form fields structure with proxy access

```typescript
type RemoteFormFields<T> =
WillRecurseIndefinitely<T> extends true
? RecursiveFormFields
: NonNullable<T> extends
| string
| number
| boolean
| File
? RemoteFormField<NonNullable<T>>
: T extends string[] | File[]
? RemoteFormField<T> & {
[K in number]: RemoteFormField<T[number]>;
}
: T extends Array<infer U>
? RemoteFormFieldContainer<T> & {
[K in number]: RemoteFormFields<U>;
}
: RemoteFormFieldContainer<T> & {
[K in keyof T]-?: RemoteFormFields<T[K]>;
};
```

## RemoteFormInput[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteFormInput)

```kotlin
interface RemoteFormInput {…}
```

```typescript
[key: string]: MaybeArray<string | number | boolean | File | RemoteFormInput>;
```

## RemoteFormIssue[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteFormIssue)

```kotlin
interface RemoteFormIssue {…}
```

```typescript
path: Array<string | number>;
```

## RemotePrerenderFunction[](https://svelte.dev/docs/kit/@sveltejs-kit#RemotePrerenderFunction)

The return value of a remote `prerender` function. See [Remote functions](https://svelte.dev/docs/kit/remote-functions#prerender) for full documentation.

```typescript
type RemotePrerenderFunction<Input, Output> = (
arg: Input
) => RemoteResource<Output>;
```

## RemoteQuery[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteQuery)

```swift
type RemoteQuery<T> = RemoteResource<T> & {
/**
 * On the client, this function will update the value of the query without re-fetching it.
 *
 * On the server, this can be called in the context of a `command` or `form` and the specified data will accompany the action response back to the client.
 * This prevents SvelteKit needing to refresh all queries on the page in a second server round-trip.
 */
set(value: T): void;
/**
 * On the client, this function will re-fetch the query from the server.
 *
 * On the server, this can be called in the context of a `command` or `form` and the refreshed data will accompany the action response back to the client.
 * This prevents SvelteKit needing to refresh all queries on the page in a second server round-trip.
 */
refresh(): Promise<void>;
/**
 * Temporarily override the value of a query. This is used with the `updates` method of a [command](https://svelte.dev/docs/kit/remote-functions#command-Updating-queries) or [enhanced form submission](https://svelte.dev/docs/kit/remote-functions#form-enhance) to provide optimistic updates.
 *
 * ```svelte
 * <script>
 *   import { getTodos, addTodo } from './todos.remote.js';
 *   const todos = getTodos();
 * </script>
 *
 * <form {...addTodo.enhance(async ({ data, submit }) => {
 *   await submit().updates(
 *     todos.withOverride((todos) => [...todos, { text: data.get('text') }])
 *   );
 * })}>
 *   <input type="text" name="text" />
 *   <button type="submit">Add Todo</button>
 * </form>
 * ```
 */
withOverride(
update: (current: Awaited<T>) => Awaited<T>
): RemoteQueryOverride;
};
```

## RemoteQueryFunction[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteQueryFunction)

The return value of a remote `query` function. See [Remote functions](https://svelte.dev/docs/kit/remote-functions#query) for full documentation.

```typescript
type RemoteQueryFunction<Input, Output> = (
arg: Input
) => RemoteQuery<Output>;
```

## RemoteQueryOverride[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteQueryOverride)

```kotlin
interface RemoteQueryOverride {…}
```

## RemoteResource[](https://svelte.dev/docs/kit/@sveltejs-kit#RemoteResource)

```csharp
type RemoteResource<T> = Promise<Awaited<T>> & {
/** The error in case the query fails. Most often this is a [`HttpError`](https://svelte.dev/docs/kit/@sveltejs-kit#HttpError) but it isn't guaranteed to be. */
get error(): any;
/** `true` before the first result is available and during refreshes */
get loading(): boolean;
} & (
| {
/** The current value of the query. Undefined until `ready` is `true` */
get current(): undefined;
ready: false;
  }
| {
/** The current value of the query. Undefined until `ready` is `true` */
get current(): Awaited<T>;
ready: true;
  }
);
```

## RequestEvent[](https://svelte.dev/docs/kit/@sveltejs-kit#RequestEvent)

```java
interface RequestEvent<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
RouteId extends AppRouteId | null = AppRouteId | null
> {…}
```

Get or set cookies related to the current request

`fetch` is equivalent to the [native `fetch` web API](https://developer.mozilla.org/en-US/docs/Web/API/fetch), with a few additional features:

-   It can be used to make credentialed requests on the server, as it inherits the `cookie` and `authorization` headers for the page request.
-   It can make relative requests on the server (ordinarily, `fetch` requires a URL with an origin when used in a server context).
-   Internal requests (e.g. for `+server.js` routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
-   During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the `text` and `json` methods of the `Response` object. Note that headers will _not_ be serialized, unless explicitly included via [`filterSerializedResponseHeaders`](https://svelte.dev/docs/kit/hooks#Server-hooks-handle)
-   During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request.

You can learn more about making credentialed requests with cookies [here](https://svelte.dev/docs/kit/load#Cookies).

```typescript
getClientAddress: () => string;
```

The client’s IP address, set by the adapter.

The parameters of the current route - e.g. for a route like `/blog/[slug]`, a `{ slug: string }` object.

```vbnet
platform: Readonly<App.Platform> | undefined;
```

Additional data made available through the adapter.

The original request object.

Info about the current route.

The ID of the current route - e.g. for `src/routes/blog/[slug]`, it would be `/blog/[slug]`. It is `null` when no route is matched.

```typescript
setHeaders: (headers: Record<string, string>) => void;
```

If you need to set headers for the response, you can do so using the this method. This is useful if you want the page to be cached, for example:

src/routes/blog/+page

```javascript
export async function load({ fetch, setHeaders }) {

const url = `https://cms.example.com/articles.json`;
const response = await fetch(url);

setHeaders({
age: response.headers.get('age'),
'cache-control': response.headers.get('cache-control')
});

return response.json();
}
```

Setting the same header multiple times (even in separate `load` functions) is an error — you can only set a given header once.

You cannot add a `set-cookie` header with `setHeaders` — use the [`cookies`](https://svelte.dev/docs/kit/@sveltejs-kit#Cookies) API instead.

`true` if the request comes from the client asking for `+page/layout.server.js` data. The `url` property will be stripped of the internal information related to the data request in this case. Use this property instead if the distinction is important to you.

`true` for `+server.js` calls coming from SvelteKit without the overhead of actually making an HTTP request. This happens when you make same-origin `fetch` requests on the server.

-   available since v2.31.0

Access to spans for tracing. If tracing is not enabled, these spans will do nothing.

Whether tracing is enabled.

The root span for the request. This span is named `sveltekit.handle.root`.

The span associated with the current `handle` hook, `load` function, or form action.

```vbnet
isRemoteRequest: boolean;
```

`true` if the request comes from the client via a remote function. The `url` property will be stripped of the internal information related to the data request in this case. Use this property instead if the distinction is important to you.

## RequestHandler[](https://svelte.dev/docs/kit/@sveltejs-kit#RequestHandler)

A `(event: RequestEvent) => Response` function exported from a `+server.js` file that corresponds to an HTTP verb (`GET`, `PUT`, `PATCH`, etc) and handles requests with that method.

It receives `Params` as the first generic argument, which you can skip by using [generated types](https://svelte.dev/docs/kit/types#Generated-types) instead.

```typescript
type RequestHandler<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
RouteId extends AppRouteId | null = AppRouteId | null
> = (
event: RequestEvent<Params, RouteId>
) => MaybePromise<Response>;
```

## Reroute[](https://svelte.dev/docs/kit/@sveltejs-kit#Reroute)

> Available since 2.3.0

The [`reroute`](https://svelte.dev/docs/kit/hooks#Universal-hooks-reroute) hook allows you to modify the URL before it is used to determine which route to render.

```typescript
type Reroute = (event: {
url: URL;
fetch: typeof fetch;
}) => MaybePromise<void | string>;
```

## ResolveOptions[](https://svelte.dev/docs/kit/@sveltejs-kit#ResolveOptions)

```kotlin
interface ResolveOptions {…}
```

```typescript
transformPageChunk?: (input: { html: string; done: boolean }) => MaybePromise<string | undefined>;
```

-   `input` the html chunk and the info if this is the last chunk

Applies custom transforms to HTML. If `done` is true, it’s the final chunk. Chunks are not guaranteed to be well-formed HTML (they could include an element’s opening tag but not its closing tag, for example) but they will always be split at sensible boundaries such as `%sveltekit.head%` or layout/page components.

```typescript
filterSerializedResponseHeaders?: (name: string, value: string) => boolean;
```

-   `name` header name
-   `value` header value

Determines which headers should be included in serialized responses when a `load` function loads a resource with `fetch`. By default, none will be included.

```typescript
preload?: (input: { type: 'font' | 'css' | 'js' | 'asset'; path: string }) => boolean;
```

-   `input` the type of the file and its path

Determines what should be added to the `<head>` tag to preload it. By default, `js` and `css` files will be preloaded.

## RouteDefinition[](https://svelte.dev/docs/kit/@sveltejs-kit#RouteDefinition)

```csharp
interface RouteDefinition<Config = any> {…}
```

```css
api: {
methods: Array<HttpMethod | '*'>;
};
```

```css
page: {
methods: Array<Extract<HttpMethod, 'GET' | 'POST'>>;
};
```

```css
prerender: PrerenderOption;
```

```css
segments: RouteSegment[];
```

```css
methods: Array<HttpMethod | '*'>;
```

## SSRManifest[](https://svelte.dev/docs/kit/@sveltejs-kit#SSRManifest)

```kotlin
interface SSRManifest {…}
```

Static files from `kit.config.files.assets` and the service worker (if any).

```vbnet
mimeTypes: Record<string, string>;
```

private fields

```css
client: NonNullable<BuildData['client']>;
```

```typescript
remotes: Record<string, () => Promise<any>>;
```

hashed filename -> import to that file

```vbnet
prerendered_routes: Set<string>;
```

```typescript
matchers: () => Promise<Record<string, ParamMatcher>>;
```

```typescript
server_assets: Record<string, number>;
```

A `[file]: size` map of all assets imported by server code.

## ServerInit[](https://svelte.dev/docs/kit/@sveltejs-kit#ServerInit)

> Available since 2.10.0

The [`init`](https://svelte.dev/docs/kit/hooks#Shared-hooks-init) will be invoked before the server responds to its first request

```typescript
type ServerInit = () => MaybePromise<void>;
```

## ServerInitOptions[](https://svelte.dev/docs/kit/@sveltejs-kit#ServerInitOptions)

```kotlin
interface ServerInitOptions {…}
```

```vbnet
env: Record<string, string>;
```

A map of environment variables.

```typescript
read?: (file: string) => MaybePromise<ReadableStream | null>;
```

A function that turns an asset filename into a `ReadableStream`. Required for the `read` export from `$app/server` to work.

## ServerLoad[](https://svelte.dev/docs/kit/@sveltejs-kit#ServerLoad)

The generic form of `PageServerLoad` and `LayoutServerLoad`. You should import those from `./$types` (see [generated types](https://svelte.dev/docs/kit/types#Generated-types)) rather than using `ServerLoad` directly.

```typescript
type ServerLoad<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
ParentData extends Record<string, any> = Record<
string,
any
>,
OutputData extends Record<string, any> | void = Record<
string,
any
> | void,
RouteId extends AppRouteId | null = AppRouteId | null
> = (
event: ServerLoadEvent<Params, ParentData, RouteId>
) => MaybePromise<OutputData>;
```

## ServerLoadEvent[](https://svelte.dev/docs/kit/@sveltejs-kit#ServerLoadEvent)

```java
interface ServerLoadEvent<
Params extends
AppLayoutParams<'/'> = AppLayoutParams<'/'>,
ParentData extends Record<string, any> = Record<
string,
any
>,
RouteId extends AppRouteId | null = AppRouteId | null
> extends RequestEvent<Params, RouteId> {…}
```

```javascript
parent: () => Promise<ParentData>;
```

`await parent()` returns data from parent `+layout.server.js` `load` functions.

Be careful not to introduce accidental waterfalls when using `await parent()`. If for example you only want to merge parent data into the returned output, call it _after_ fetching your other data.

```typescript
depends: (...deps: string[]) => void;
```

This function declares that the `load` function has a _dependency_ on one or more URLs or custom identifiers, which can subsequently be used with [`invalidate()`](https://svelte.dev/docs/kit/$app-navigation#invalidate) to cause `load` to rerun.

Most of the time you won’t need this, as `fetch` calls `depends` on your behalf — it’s only necessary if you’re using a custom API client that bypasses `fetch`.

URLs can be absolute or relative to the page being loaded, and must be [encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding).

Custom identifiers have to be prefixed with one or more lowercase letters followed by a colon to conform to the [URI specification](https://www.rfc-editor.org/rfc/rfc3986.html).

The following example shows how to use `depends` to register a dependency on a custom identifier, which is `invalidate`d after a button click, making the `load` function rerun.

src/routes/+page

```javascript
let count = 0;
export async function load({ depends }) {
depends('increase:count');

return { count: count++ };
}
```

src/routes/+page

```php-template
<script>
import { invalidate } from '$app/navigation';

let { data } = $props();

const increase = async () => {
await invalidate('increase:count');
}
</script>

<p>{data.count}<p>
<button on:click={increase}>Increase Count</button>
```

```javascript
untrack: <T>(fn: () => T) => T;
```

Use this function to opt out of dependency tracking for everything that is synchronously called within the callback. Example:

src/routes/+page

```javascript
export async function load({ untrack, url }) {

// Untrack url.pathname so that path changes don't trigger a rerun
if (untrack(() => url.pathname === '/')) {
return { message: 'Welcome!' };
}
}
```

-   available since v2.31.0

Access to spans for tracing. If tracing is not enabled, these spans will do nothing.

Whether tracing is enabled.

The root span for the request. This span is named `sveltekit.handle.root`.

The span associated with the current server `load` function.

## Snapshot[](https://svelte.dev/docs/kit/@sveltejs-kit#Snapshot)

The type of `export const snapshot` exported from a page or layout component.

```csharp
interface Snapshot<T = any> {…}
```

```javascript
restore: (snapshot: T) => void;
```

## SubmitFunction[](https://svelte.dev/docs/kit/@sveltejs-kit#SubmitFunction)

```php
type SubmitFunction<
Success extends
| Record<string, unknown>
| undefined = Record<string, any>,
Failure extends
| Record<string, unknown>
| undefined = Record<string, any>
> = (input: {
action: URL;
formData: FormData;
formElement: HTMLFormElement;
controller: AbortController;
submitter: HTMLElement | null;
cancel: () => void;
}) => MaybePromise<
| void
| ((opts: {
formData: FormData;
formElement: HTMLFormElement;
action: URL;
result: ActionResult<Success, Failure>;
/**
 * Call this to get the default behavior of a form submission response.
 * @param options Set `reset: false` if you don't want the `<form>` values to be reset after a successful submission.
 * @param invalidateAll Set `invalidateAll: false` if you don't want the action to call `invalidateAll` after submission.
 */
update: (options?: {
reset?: boolean;
invalidateAll?: boolean;
}) => Promise<void>;
  }) => MaybePromise<void>)
>;
```

## Transport[](https://svelte.dev/docs/kit/@sveltejs-kit#Transport)

> Available since 2.11.0

The [`transport`](https://svelte.dev/docs/kit/hooks#Universal-hooks-transport) hook allows you to transport custom types across the server/client boundary.

Each transporter has a pair of `encode` and `decode` functions. On the server, `encode` determines whether a value is an instance of the custom type and, if so, returns a non-falsy encoding of the value which can be an object or an array (or `false` otherwise).

In the browser, `decode` turns the encoding back into an instance of the custom type.

```typescript
import type { Transport } from '@sveltejs/kit';

declare class MyCustomType {
data: any
}

// hooks.js
export const transport: Transport = {
MyCustomType: {
encode: (value) => value instanceof MyCustomType && [value.data],
decode: ([data]) => new MyCustomType(data)
}
};
```

```go
type Transport = Record<string, Transporter>;
```

## Transporter[](https://svelte.dev/docs/kit/@sveltejs-kit#Transporter)

A member of the [`transport`](https://svelte.dev/docs/kit/hooks#Universal-hooks-transport) hook.

```javascript
interface Transporter<
T = any,
U = Exclude<
any,
false | 0 | '' | null | undefined | typeof NaN
>
> {…}
```

```javascript
encode: (value: T) => false | U;
```

## ValidationError[](https://svelte.dev/docs/kit/@sveltejs-kit#ValidationError)

A validation error thrown by `invalid`.

```kotlin
interface ValidationError {…}
```

```css
issues: StandardSchemaV1.Issue[];
```

The validation issues

## Private types[](https://svelte.dev/docs/kit/@sveltejs-kit#Private-types)

The following are referenced by the public types documented above, but cannot be imported directly:

## AdapterEntry[](https://svelte.dev/docs/kit/@sveltejs-kit#AdapterEntry)

```kotlin
interface AdapterEntry {…}
```

A string that uniquely identifies an HTTP service (e.g. serverless function) and is used for deduplication. For example, `/foo/a-[b]` and `/foo/[c]` are different routes, but would both be represented in a Netlify \_redirects file as `/foo/:param`, so they share an ID

```css
filter(route: RouteDefinition): boolean;
```

A function that compares the candidate route with the current route to determine if it should be grouped with the current route.

Use cases:

-   Fallback pages: `/foo/[c]` is a fallback for `/foo/a-[b]`, and `/[...catchall]` is a fallback for all routes
-   Grouping routes that share a common `config`: `/foo` should be deployed to the edge, `/bar` and `/baz` should be deployed to a serverless function

```php
complete(entry: { generateManifest(opts: { relativePath: string }): string }): MaybePromise<void>;
```

A function that is invoked once the entry has been created. This is where you should write the function to the filesystem and generate redirect manifests.

## Csp[](https://svelte.dev/docs/kit/@sveltejs-kit#Csp)

```typescript
namespace Csp {
type ActionSource = 'strict-dynamic' | 'report-sample';
type BaseSource =
| 'self'
| 'unsafe-eval'
| 'unsafe-hashes'
| 'unsafe-inline'
| 'wasm-unsafe-eval'
| 'none';
type CryptoSource =
`${'nonce' | 'sha256' | 'sha384' | 'sha512'}-${string}`;
type FrameSource =
| HostSource
| SchemeSource
| 'self'
| 'none';
type HostNameScheme = `${string}.${string}` | 'localhost';
type HostSource =
`${HostProtocolSchemes}${HostNameScheme}${PortScheme}`;
type HostProtocolSchemes = `${string}://` | '';
type HttpDelineator = '/' | '?' | '#' | '\\';
type PortScheme = `:${number}` | '' | ':*';
type SchemeSource =
| 'http:'
| 'https:'
| 'data:'
| 'mediastream:'
| 'blob:'
| 'filesystem:';
type Source =
| HostSource
| SchemeSource
| CryptoSource
| BaseSource;
type Sources = Source[];
}
```

## CspDirectives[](https://svelte.dev/docs/kit/@sveltejs-kit#CspDirectives)

```kotlin
interface CspDirectives {…}
```

```ruby
'child-src'?: Csp.Sources;
```

```javascript
'default-src'?: Array<Csp.Source | Csp.ActionSource>;
```

```ruby
'frame-src'?: Csp.Sources;
```

```ruby
'worker-src'?: Csp.Sources;
```

```ruby
'connect-src'?: Csp.Sources;
```

```ruby
'font-src'?: Csp.Sources;
```

```ruby
'manifest-src'?: Csp.Sources;
```

```ruby
'media-src'?: Csp.Sources;
```

```ruby
'object-src'?: Csp.Sources;
```

```ruby
'prefetch-src'?: Csp.Sources;
```

```javascript
'script-src'?: Array<Csp.Source | Csp.ActionSource>;
```

```ruby
'script-src-elem'?: Csp.Sources;
```

```ruby
'script-src-attr'?: Csp.Sources;
```

```javascript
'style-src'?: Array<Csp.Source | Csp.ActionSource>;
```

```ruby
'style-src-elem'?: Csp.Sources;
```

```ruby
'style-src-attr'?: Csp.Sources;
```

```javascript
'base-uri'?: Array<Csp.Source | Csp.ActionSource>;
```

```css
sandbox?: Array<
| 'allow-downloads-without-user-activation'
| 'allow-forms'
| 'allow-modals'
| 'allow-orientation-lock'
| 'allow-pointer-lock'
| 'allow-popups'
| 'allow-popups-to-escape-sandbox'
| 'allow-presentation'
| 'allow-same-origin'
| 'allow-scripts'
| 'allow-storage-access-by-user-activation'
| 'allow-top-navigation'
| 'allow-top-navigation-by-user-activation'
>;
```

```javascript
'form-action'?: Array<Csp.Source | Csp.ActionSource>;
```

```javascript
'frame-ancestors'?: Array<Csp.HostSource | Csp.SchemeSource | Csp.FrameSource>;
```

```javascript
'navigate-to'?: Array<Csp.Source | Csp.ActionSource>;
```

```javascript
'require-trusted-types-for'?: Array<'script'>;
```

```typescript
'trusted-types'?: Array<'none' | 'allow-duplicates' | '*' | string>;
```

```java
'upgrade-insecure-requests'?: boolean;
```

```javascript
'require-sri-for'?: Array<'script' | 'style' | 'script style'>;
```

-   deprecated

```java
'block-all-mixed-content'?: boolean;
```

-   deprecated

```typescript
'plugin-types'?: Array<`${string}/${string}` | 'none'>;
```

-   deprecated

```css
referrer?: Array<
| 'no-referrer'
| 'no-referrer-when-downgrade'
| 'origin'
| 'origin-when-cross-origin'
| 'same-origin'
| 'strict-origin'
| 'strict-origin-when-cross-origin'
| 'unsafe-url'
| 'none'
>;
```

-   deprecated

## HttpMethod[](https://svelte.dev/docs/kit/@sveltejs-kit#HttpMethod)

```bash
type HttpMethod =
| 'GET'
| 'HEAD'
| 'POST'
| 'PUT'
| 'DELETE'
| 'PATCH'
| 'OPTIONS';
```

## Logger[](https://svelte.dev/docs/kit/@sveltejs-kit#Logger)

```php
success(msg: string): void;
```

```php
error(msg: string): void;
```

```php
minor(msg: string): void;
```

## MaybePromise[](https://svelte.dev/docs/kit/@sveltejs-kit#MaybePromise)

```r
type MaybePromise<T> = T | Promise<T>;
```

## PrerenderEntryGeneratorMismatchHandler[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderEntryGeneratorMismatchHandler)

```kotlin
interface PrerenderEntryGeneratorMismatchHandler {…}
```

```css
(details: { generatedFromId: string; entry: string; matchedId: string; message: string }): void;
```

## PrerenderEntryGeneratorMismatchHandlerValue[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderEntryGeneratorMismatchHandlerValue)

```bash
type PrerenderEntryGeneratorMismatchHandlerValue =
| 'fail'
| 'warn'
| 'ignore'
| PrerenderEntryGeneratorMismatchHandler;
```

## PrerenderHttpErrorHandler[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderHttpErrorHandler)

```kotlin
interface PrerenderHttpErrorHandler {…}
```

```css
(details: {
status: number;
path: string;
referrer: string | null;
referenceType: 'linked' | 'fetched';
message: string;
}): void;
```

## PrerenderHttpErrorHandlerValue[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderHttpErrorHandlerValue)

```bash
type PrerenderHttpErrorHandlerValue =
| 'fail'
| 'warn'
| 'ignore'
| PrerenderHttpErrorHandler;
```

## PrerenderMap[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderMap)

```typescript
type PrerenderMap = Map<string, PrerenderOption>;
```

## PrerenderMissingIdHandler[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderMissingIdHandler)

```kotlin
interface PrerenderMissingIdHandler {…}
```

```css
(details: { path: string; id: string; referrers: string[]; message: string }): void;
```

## PrerenderMissingIdHandlerValue[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderMissingIdHandlerValue)

```bash
type PrerenderMissingIdHandlerValue =
| 'fail'
| 'warn'
| 'ignore'
| PrerenderMissingIdHandler;
```

## PrerenderOption[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderOption)

```java
type PrerenderOption = boolean | 'auto';
```

## PrerenderUnseenRoutesHandler[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderUnseenRoutesHandler)

```kotlin
interface PrerenderUnseenRoutesHandler {…}
```

```css
(details: { routes: string[]; message: string }): void;
```

## PrerenderUnseenRoutesHandlerValue[](https://svelte.dev/docs/kit/@sveltejs-kit#PrerenderUnseenRoutesHandlerValue)

```bash
type PrerenderUnseenRoutesHandlerValue =
| 'fail'
| 'warn'
| 'ignore'
| PrerenderUnseenRoutesHandler;
```

## Prerendered[](https://svelte.dev/docs/kit/@sveltejs-kit#Prerendered)

```kotlin
interface Prerendered {…}
```

```csharp
pages: Map<
string,
{
/** The location of the .html file relative to the output directory */
file: string;
}
>;
```

A map of `path` to `{ file }` objects, where a path like `/foo` corresponds to `foo.html` and a path like `/bar/` corresponds to `bar/index.html`.

```css
assets: Map<
string,
{
/** The MIME type of the asset */
type: string;
}
>;
```

A map of `path` to `{ type }` objects.

```typescript
redirects: Map<
string,
{
status: number;
location: string;
}
>;
```

A map of redirects encountered during prerendering.

An array of prerendered paths (without trailing slashes, regardless of the trailingSlash config)

## RequestOptions[](https://svelte.dev/docs/kit/@sveltejs-kit#RequestOptions)

```kotlin
interface RequestOptions {…}
```

```scss
getClientAddress(): string;
```

## RouteSegment[](https://svelte.dev/docs/kit/@sveltejs-kit#RouteSegment)

```kotlin
interface RouteSegment {…}
```

## TrailingSlash[](https://svelte.dev/docs/kit/@sveltejs-kit#TrailingSlash)

```bash
type TrailingSlash = 'never' | 'always' | 'ignore';
```