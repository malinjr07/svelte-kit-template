SvelteKit makes three read-only state objects available via the `$app/state` module — `page`, `navigating` and `updated`.

> This module was added in 2.12. If you’re using an earlier version of SvelteKit, use [`$app/stores`](https://svelte.dev/docs/kit/$app-stores) instead.

```javascript
import { navigating, page, updated } from '$app/state';
```

## navigating[](https://svelte.dev/docs/kit/$app-state#navigating)

A read-only object representing an in-progress navigation, with `from`, `to`, `type` and (if `type === 'popstate'`) `delta` properties. Values are `null` when no navigation is occurring, or during server rendering.

```yaml
const navigating:
| import('@sveltejs/kit').Navigation
| {
from: null;
to: null;
type: null;
willUnload: null;
delta: null;
complete: null;
  };
```

## page[](https://svelte.dev/docs/kit/$app-state#page)

A read-only reactive object with information about the current page, serving several use cases:

-   retrieving the combined `data` of all pages/layouts anywhere in your component tree (also see [loading data](https://svelte.dev/docs/kit/load))
-   retrieving the current value of the `form` prop anywhere in your component tree (also see [form actions](https://svelte.dev/docs/kit/form-actions))
-   retrieving the page state that was set through `goto`, `pushState` or `replaceState` (also see [goto](https://svelte.dev/docs/kit/$app-navigation#goto) and [shallow routing](https://svelte.dev/docs/kit/shallow-routing))
-   retrieving metadata such as the URL you’re on, the current route and its parameters, and whether or not there was an error

Changes to `page` are available exclusively with runes. (The legacy reactivity syntax will not reflect any changes)

On the server, values can only be read during rendering (in other words _not_ in e.g. `load` functions). In the browser, the values can be read at any time.

```css
const page: import('@sveltejs/kit').Page;
```

## updated[](https://svelte.dev/docs/kit/$app-state#updated)

A read-only reactive value that’s initially `false`. If [`version.pollInterval`](https://svelte.dev/docs/kit/configuration#version) is a non-zero value, SvelteKit will poll for new versions of the app and update `current` to `true` when it detects one. `updated.check()` will force an immediate check, regardless of polling.

```typescript
const updated: {
get current(): boolean;
check(): Promise<boolean>;
};
```