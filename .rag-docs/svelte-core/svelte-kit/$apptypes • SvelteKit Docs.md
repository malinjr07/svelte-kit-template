This module contains generated types for the routes in your app.

> Available since 2.26

```python
import type { RouteId, RouteParams, LayoutParams } from '$app/types';
```

## Asset[](https://svelte.dev/docs/kit/$app-types#Asset)

A union of all the filenames of assets contained in your `static` directory, plus a `string` wildcard for asset paths generated from `import` declarations.

```go
type Asset = '/favicon.png' | '/robots.txt' | (string & {});
```

## RouteId[](https://svelte.dev/docs/kit/$app-types#RouteId)

A union of all the route IDs in your app. Used for `page.route.id` and `event.route.id`.

```bash
type RouteId = '/' | '/my-route' | '/my-other-route/[param]';
```

## Pathname[](https://svelte.dev/docs/kit/$app-types#Pathname)

A union of all valid pathnames in your app.

```typescript
type Pathname = '/' | '/my-route' | `/my-other-route/${string}` & {};
```

## ResolvedPathname[](https://svelte.dev/docs/kit/$app-types#ResolvedPathname)

Similar to `Pathname`, but possibly prefixed with a [base path](https://svelte.dev/docs/kit/configuration#paths). Used for `page.url.pathname`.

```typescript
type ResolvedPathname = `${'' | `/${string}`}/` | `${'' | `/${string}`}/my-route` | `${'' | `/${string}`}/my-other-route/${string}` | {};
```

## RouteParams[](https://svelte.dev/docs/kit/$app-types#RouteParams)

A utility for getting the parameters associated with a given route.

```go
type BlogParams = RouteParams<'/blog/[slug]'>; // { slug: string }
```

```typescript
type RouteParams<T extends RouteId> = { /* generated */ } | Record<string, never>;
```

## LayoutParams[](https://svelte.dev/docs/kit/$app-types#LayoutParams)

A utility for getting the parameters associated with a given layout, which is similar to `RouteParams` but also includes optional parameters for any child route.

```typescript
type RouteParams<T extends RouteId> = { /* generated */ } | Record<string, never>;
```