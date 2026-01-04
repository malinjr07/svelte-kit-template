```php-template
<svelte:document onevent={handler} />
```

```php-template
<svelte:document bind:prop={value} />
```

Similarly to `<svelte:window>`, this element allows you to add listeners to events on `document`, such as `visibilitychange`, which don’t fire on `window`. It also lets you use [actions](https://svelte.dev/docs/svelte/use) on `document`.

As with `<svelte:window>`, this element may only appear the top level of your component and must never be inside a block or element.

```css
<svelte:document onvisibilitychange={handleVisibilityChange} use:someAction />
```

You can also bind to the following properties:

-   `activeElement`
-   `fullscreenElement`
-   `pointerLockElement`
-   `visibilityState`

All are readonly.