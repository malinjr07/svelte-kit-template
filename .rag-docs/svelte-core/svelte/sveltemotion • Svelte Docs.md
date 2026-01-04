```javascript
import {
Spring,
Tween,
prefersReducedMotion,
spring,
tweened
} from 'svelte/motion';
```

## Spring[](https://svelte.dev/docs/svelte/svelte-motion#Spring)

> Available since 5.8.0

A wrapper for a value that behaves in a spring-like fashion. Changes to `spring.target` will cause `spring.current` to move towards it over time, taking account of the `spring.stiffness` and `spring.damping` parameters.

```php-template
<script>
import { Spring } from 'svelte/motion';

const spring = new Spring(0);
</script>

<input type="range" bind:value={spring.target} />
<input type="range" bind:value={spring.current} disabled />
```

```javascript
constructor(value: T, options?: SpringOpts);
```

```php
static of<U>(fn: () => U, options?: SpringOpts): Spring<U>;
```

Create a spring whose value is bound to the return value of `fn`. This must be called inside an effect root (for example, during component initialisation).

```php-template
<script>
import { Spring } from 'svelte/motion';

let { number } = $props();

const spring = Spring.of(() => number);
</script>
```

```csharp
set(value: T, options?: SpringUpdateOpts): Promise<void>;
```

Sets `spring.target` to `value` and returns a `Promise` that resolves if and when `spring.current` catches up to it.

If `options.instant` is `true`, `spring.current` immediately matches `spring.target`.

If `options.preserveMomentum` is provided, the spring will continue on its current trajectory for the specified number of milliseconds. This is useful for things like ‘fling’ gestures.

The end value of the spring. This property only exists on the `Spring` class, not the legacy `spring` store.

The current value of the spring. This property only exists on the `Spring` class, not the legacy `spring` store.

## Tween[](https://svelte.dev/docs/svelte/svelte-motion#Tween)

> Available since 5.8.0

A wrapper for a value that tweens smoothly to its target value. Changes to `tween.target` will cause `tween.current` to move towards it over time, taking account of the `delay`, `duration` and `easing` options.

```php-template
<script>
import { Tween } from 'svelte/motion';

const tween = new Tween(0);
</script>

<input type="range" bind:value={tween.target} />
<input type="range" bind:value={tween.current} disabled />
```

```php
static of<U>(fn: () => U, options?: TweenedOptions<U> | undefined): Tween<U>;
```

Create a tween whose value is bound to the return value of `fn`. This must be called inside an effect root (for example, during component initialisation).

```php-template
<script>
import { Tween } from 'svelte/motion';

let { number } = $props();

const tween = Tween.of(() => number);
</script>
```

```javascript
constructor(value: T, options?: TweenedOptions<T>);
```

```javascript
set(value: T, options?: TweenedOptions<T> | undefined): Promise<void>;
```

Sets `tween.target` to `value` and returns a `Promise` that resolves if and when `tween.current` catches up to it.

If `options` are provided, they will override the tween’s defaults.

## prefersReducedMotion[](https://svelte.dev/docs/svelte/svelte-motion#prefersReducedMotion)

> Available since 5.7.0

A [media query](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery) that matches if the user [prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

```php-template
<script>
import { prefersReducedMotion } from 'svelte/motion';
import { fly } from 'svelte/transition';

let visible = $state(false);
</script>

<button onclick={() => visible = !visible}>
toggle
</button>

{#if visible}
<p transition:fly={{ y: prefersReducedMotion.current ? 0 : 200 }}>
flies in, unless the user prefers reduced motion
</p>
{/if}
```

```cpp
const prefersReducedMotion: MediaQuery;
```

## spring[](https://svelte.dev/docs/svelte/svelte-motion#spring)

> Use [`Spring`](https://svelte.dev/docs/svelte/svelte-motion#Spring) instead

The spring function in Svelte creates a store whose value is animated, with a motion that simulates the behavior of a spring. This means when the value changes, instead of transitioning at a steady rate, it “bounces” like a spring would, depending on the physics parameters provided. This adds a level of realism to the transitions and can enhance the user experience.

```r
function spring<T = any>(
value?: T | undefined,
opts?: SpringOpts | undefined
): Spring<T>;
```

## tweened[](https://svelte.dev/docs/svelte/svelte-motion#tweened)

> Use [`Tween`](https://svelte.dev/docs/svelte/svelte-motion#Tween) instead

A tweened store in Svelte is a special type of store that provides smooth transitions between state values over time.

```r
function tweened<T>(
value?: T | undefined,
defaults?: TweenedOptions<T> | undefined
): Tweened<T>;
```

## Spring[](https://svelte.dev/docs/svelte/svelte-motion#Spring)

```csharp
interface Spring<T> extends Readable<T> {…}
```

```csharp
set(new_value: T, opts?: SpringUpdateOpts): Promise<void>;
```

```javascript
update: (fn: Updater<T>, opts?: SpringUpdateOpts) => Promise<void>;
```

-   deprecated Only exists on the legacy `spring` store, not the `Spring` class

```javascript
subscribe(fn: (value: T) => void): Unsubscriber;
```

-   deprecated Only exists on the legacy `spring` store, not the `Spring` class

## Tweened[](https://svelte.dev/docs/svelte/svelte-motion#Tweened)

```csharp
interface Tweened<T> extends Readable<T> {…}
```

```swift
set(value: T, opts?: TweenedOptions<T>): Promise<void>;
```

```php-template
update(updater: Updater<T>, opts?: TweenedOptions<T>): Promise<void>;
```