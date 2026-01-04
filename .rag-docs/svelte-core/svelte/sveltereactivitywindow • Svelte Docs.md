This module exports reactive versions of various `window` values, each of which has a reactive `current` property that you can reference in reactive contexts (templates, [deriveds](https://svelte.dev/docs/svelte/$derived) and [effects](https://svelte.dev/docs/svelte/$effect)) without using [`<svelte:window>`](https://svelte.dev/docs/svelte/svelte-window) bindings or manually creating your own event listeners.

```php-template
<script>
import { innerWidth, innerHeight } from 'svelte/reactivity/window';
</script>

<p>{innerWidth.current}x{innerHeight.current}</p>
```

```javascript
import {
devicePixelRatio,
innerHeight,
innerWidth,
online,
outerHeight,
outerWidth,
screenLeft,
screenTop,
scrollX,
scrollY
} from 'svelte/reactivity/window';
```

## devicePixelRatio[](https://svelte.dev/docs/svelte/svelte-reactivity-window#devicePixelRatio)

> Available since 5.11.0

`devicePixelRatio.current` is a reactive view of `window.devicePixelRatio`. On the server it is `undefined`. Note that behaviour differs between browsers — on Chrome it will respond to the current zoom level, on Firefox and Safari it won’t.

```typescript
const devicePixelRatio: {
get current(): number | undefined;
};
```

## innerHeight[](https://svelte.dev/docs/svelte/svelte-reactivity-window#innerHeight)

> Available since 5.11.0

`innerHeight.current` is a reactive view of `window.innerHeight`. On the server it is `undefined`.

```typescript
const innerHeight: ReactiveValue<number | undefined>;
```

## innerWidth[](https://svelte.dev/docs/svelte/svelte-reactivity-window#innerWidth)

> Available since 5.11.0

`innerWidth.current` is a reactive view of `window.innerWidth`. On the server it is `undefined`.

```typescript
const innerWidth: ReactiveValue<number | undefined>;
```

## online[](https://svelte.dev/docs/svelte/svelte-reactivity-window#online)

> Available since 5.11.0

`online.current` is a reactive view of `navigator.onLine`. On the server it is `undefined`.

```typescript
const online: ReactiveValue<boolean | undefined>;
```

## outerHeight[](https://svelte.dev/docs/svelte/svelte-reactivity-window#outerHeight)

> Available since 5.11.0

`outerHeight.current` is a reactive view of `window.outerHeight`. On the server it is `undefined`.

```typescript
const outerHeight: ReactiveValue<number | undefined>;
```

## outerWidth[](https://svelte.dev/docs/svelte/svelte-reactivity-window#outerWidth)

> Available since 5.11.0

`outerWidth.current` is a reactive view of `window.outerWidth`. On the server it is `undefined`.

```typescript
const outerWidth: ReactiveValue<number | undefined>;
```

## screenLeft[](https://svelte.dev/docs/svelte/svelte-reactivity-window#screenLeft)

> Available since 5.11.0

`screenLeft.current` is a reactive view of `window.screenLeft`. It is updated inside a `requestAnimationFrame` callback. On the server it is `undefined`.

```typescript
const screenLeft: ReactiveValue<number | undefined>;
```

## screenTop[](https://svelte.dev/docs/svelte/svelte-reactivity-window#screenTop)

> Available since 5.11.0

`screenTop.current` is a reactive view of `window.screenTop`. It is updated inside a `requestAnimationFrame` callback. On the server it is `undefined`.

```typescript
const screenTop: ReactiveValue<number | undefined>;
```

> Available since 5.11.0

`scrollX.current` is a reactive view of `window.scrollX`. On the server it is `undefined`.

```typescript
const scrollX: ReactiveValue<number | undefined>;
```

> Available since 5.11.0

`scrollY.current` is a reactive view of `window.scrollY`. On the server it is `undefined`.

```typescript
const scrollY: ReactiveValue<number | undefined>;
```