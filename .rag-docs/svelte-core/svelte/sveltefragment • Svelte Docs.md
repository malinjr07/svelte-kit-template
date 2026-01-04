SvelteLegacy APIs

The `<svelte:fragment>` element allows you to place content in a [named slot](https://svelte.dev/docs/svelte/legacy-slots) without wrapping it in a container DOM element. This keeps the flow layout of your document intact.

Widget

```php-template
<div>
<slot name="header">No header was provided</slot>
<p>Some content between header and footer</p>
<slot name="footer" />
</div>
```

> In Svelte 5+, this concept is obsolete, as snippets don’t create a wrapping element

[Edit this page on GitHub](https://github.com/sveltejs/svelte/edit/main/documentation/docs/99-legacy/22-legacy-svelte-fragment.md) [llms.txt](https://svelte.dev/docs/svelte/legacy-svelte-fragment/llms.txt)