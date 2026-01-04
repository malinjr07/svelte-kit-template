An animation is triggered when the contents of a [keyed each block](https://svelte.dev/docs/svelte/each#Keyed-each-blocks) are re-ordered. Animations do not run when an element is added or removed, only when the index of an existing data item within the each block changes. Animate directives must be on an element that is an _immediate_ child of a keyed each block.

Animations can be used with Svelte’s [built-in animation functions](https://svelte.dev/docs/svelte/svelte-animate) or [custom animation functions](https://svelte.dev/docs/svelte/animate#Custom-animation-functions).

```php-template
<!-- When `list` is reordered the animation will run -->
{#each list as item, index (item)}
<li animate:flip>{item}</li>
{/each}
```

## Animation Parameters[](https://svelte.dev/docs/svelte/animate#Animation-Parameters)

As with actions and transitions, animations can have parameters.

(The double `{{curlies}}` aren’t a special syntax; this is an object literal inside an expression tag.)

```css
{#each list as item, index (item)}
<li animate:flip={{ delay: 500 }}>{item}</li>
{/each}
```

## Custom animation functions[](https://svelte.dev/docs/svelte/animate#Custom-animation-functions)

```typescript
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect } , params: any) => {
delay?: number,
duration?: number,
easing?: (t: number) => number,
css?: (t: number, u: number) => string,
tick?: (t: number, u: number) => void
}
```

Animations can use custom functions that provide the `node`, an `animation` object and any `parameters` as arguments. The `animation` parameter is an object containing `from` and `to` properties each containing a [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect#Properties) describing the geometry of the element in its `start` and `end` positions. The `from` property is the DOMRect of the element in its starting position, and the `to` property is the DOMRect of the element in its final position after the list has been reordered and the DOM updated.

If the returned object has a `css` method, Svelte will create a [web animation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) that plays on the element.

The `t` argument passed to `css` is a value that goes from `0` and `1` after the `easing` function has been applied. The `u` argument is equal to `1 - t`.

The function is called repeatedly _before_ the animation begins, with different `t` and `u` arguments.

A custom animation function can also return a `tick` function, which is called _during_ the animation with the same `t` and `u` arguments.

> If it’s possible to use `css` instead of `tick`, do so — web animations can run off the main thread, preventing jank on slower devices.