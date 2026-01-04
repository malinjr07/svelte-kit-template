This module contains store-based equivalents of the exports from [`$app/state`](https://svelte.dev/docs/kit/$app-state). If you’re using SvelteKit 2.12 or later, use that module instead.

```javascript
import { getStores, navigating, page, updated } from '$app/stores';
```

## getStores[](https://svelte.dev/docs/kit/$app-stores#getStores)

```csharp
function getStores(): {
page: typeof page;

navigating: typeof navigating;

updated: typeof updated;
};
```

## navigating[](https://svelte.dev/docs/kit/$app-stores#navigating)

> Use `navigating` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))

A readable store. When navigating starts, its value is a `Navigation` object with `from`, `to`, `type` and (if `type === 'popstate'`) `delta` properties. When navigating finishes, its value reverts to `null`.

On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.

```javascript
const navigating: import('svelte/store').Readable<
import('@sveltejs/kit').Navigation | null
>;
```

## page[](https://svelte.dev/docs/kit/$app-stores#page)

> Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))

A readable store whose value contains page data.

On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.

```css
const page: import('svelte/store').Readable<
import('@sveltejs/kit').Page
>;
```

## updated[](https://svelte.dev/docs/kit/$app-stores#updated)

> Use `updated` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))

A readable store whose initial value is `false`. If [`version.pollInterval`](https://svelte.dev/docs/kit/configuration#version) is a non-zero value, SvelteKit will poll for new versions of the app and update the store value to `true` when it detects one. `updated.check()` will force an immediate check, regardless of polling.

On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.

```typescript
const updated: import('svelte/store').Readable<boolean> & {
check(): Promise<boolean>;
};
```