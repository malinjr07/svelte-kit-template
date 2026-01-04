```php-template
<svelte:body onevent={handler} />
```

Similarly to `<svelte:window>`, this element allows you to add listeners to events on `document.body`, such as `mouseenter` and `mouseleave`, which don’t fire on `window`. It also lets you use [actions](https://svelte.dev/docs/svelte/use) on the `<body>` element.

As with `<svelte:window>` and `<svelte:document>`, this element may only appear at the top level of your component and must never be inside a block or element.

```php-template
<svelte:body onmouseenter={handleMouseenter} onmouseleave={handleMouseleave} use:someAction />
```