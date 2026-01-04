```csharp
import { asset, assets, base, resolve, resolveRoute } from '$app/paths';
```

## asset[](https://svelte.dev/docs/kit/$app-paths#asset)

> Available since 2.26

Resolve the URL of an asset in your `static` directory, by prefixing it with [`config.kit.paths.assets`](https://svelte.dev/docs/kit/configuration#paths) if configured, or otherwise by prefixing it with the base path.

During server rendering, the base path is relative and depends on the page currently being rendered.

```php-template
<script>
import { asset } from '$app/paths';
</script>

<img alt="a potato" src={asset('/potato.jpg')} />
```

```csharp
function asset(file: Asset): string;
```

## assets[](https://svelte.dev/docs/kit/$app-paths#assets)

> Use [`asset(...)`](https://svelte.dev/docs/kit/$app-paths#asset) instead

An absolute path that matches [`config.kit.paths.assets`](https://svelte.dev/docs/kit/configuration#paths).

> If a value for `config.kit.paths.assets` is specified, it will be replaced with `'/_svelte_kit_assets'` during `vite dev` or `vite preview`, since the assets don’t yet live at their eventual URL.

```typescript
let assets:
| ''
| `https://${string}`
| `http://${string}`
| '/_svelte_kit_assets';
```

## base[](https://svelte.dev/docs/kit/$app-paths#base)

> Use [`resolve(...)`](https://svelte.dev/docs/kit/$app-paths#resolve) instead

A string that matches [`config.kit.paths.base`](https://svelte.dev/docs/kit/configuration#paths).

Example usage: `<a href="{base}/your-page">Link</a>`

```typescript
let base: '' | `/${string}`;
```

## resolve[](https://svelte.dev/docs/kit/$app-paths#resolve)

> Available since 2.26

Resolve a pathname by prefixing it with the base path, if any, or resolve a route ID by populating dynamic segments with parameters.

During server rendering, the base path is relative and depends on the page currently being rendered.

```javascript
import { resolve } from '$app/paths';

// using a pathname
const resolved = resolve(`/blog/hello-world`);

// using a route ID plus parameters
const resolved = resolve('/blog/[slug]', {
slug: 'hello-world'
});
```

```csharp
function resolve<T extends RouteId | Pathname>(
...args: ResolveArgs<T>
): ResolvedPathname;
```

## resolveRoute[](https://svelte.dev/docs/kit/$app-paths#resolveRoute)

> Use [`resolve(...)`](https://svelte.dev/docs/kit/$app-paths#resolve) instead

```csharp
function resolveRoute<T extends RouteId | Pathname>(
...args: ResolveArgs<T>
): ResolvedPathname;
```