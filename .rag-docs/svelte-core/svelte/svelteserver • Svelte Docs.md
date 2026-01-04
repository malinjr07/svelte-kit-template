```javascript
import { render } from 'svelte/server';
```

## render[](https://svelte.dev/docs/svelte/svelte-server#render)

Only available on the server and when compiling with the `server` option. Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.

```typescript
function render<
Comp extends SvelteComponent<any> | Component<any>,
Props extends ComponentProps<Comp> = ComponentProps<Comp>
>(
...args: {} extends Props
? [
component: Comp extends SvelteComponent<any>
? ComponentType<Comp>
: Comp,
options?: {
props?: Omit<Props, '$$slots' | '$$events'>;
context?: Map<any, any>;
idPrefix?: string;
}
]
: [
component: Comp extends SvelteComponent<any>
? ComponentType<Comp>
: Comp,
options: {
props: Omit<Props, '$$slots' | '$$events'>;
context?: Map<any, any>;
idPrefix?: string;
}
]
): RenderOutput;
```

[Edit this page on GitHub](https://github.com/sveltejs/svelte/edit/main/documentation/docs/98-reference/21-svelte-server.md) [llms.txt](https://svelte.dev/docs/svelte/svelte-server/llms.txt)