```javascript
import { sequence } from '@sveltejs/kit/hooks';
```

## sequence[](https://svelte.dev/docs/kit/@sveltejs-kit-hooks#sequence)

A helper function for sequencing multiple `handle` calls in a middleware-like manner. The behavior for the `handle` options is as follows:

-   `transformPageChunk` is applied in reverse order and merged
-   `preload` is applied in forward order, the first option “wins” and no `preload` options after it are called
-   `filterSerializedResponseHeaders` behaves the same as `preload`

The example above would print:

```sql
first pre-processing
first preload
second pre-processing
second filterSerializedResponseHeaders
second transform
first transform
second post-processing
first post-processing
```

```cpp
function sequence(...handlers: Handle[]): Handle;
```

[Edit this page on GitHub](https://github.com/sveltejs/kit/edit/main/documentation/docs/98-reference/15-@sveltejs-kit-hooks.md) [llms.txt](https://svelte.dev/docs/kit/@sveltejs-kit-hooks/llms.txt)