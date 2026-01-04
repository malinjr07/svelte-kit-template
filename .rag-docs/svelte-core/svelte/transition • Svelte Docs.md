A _transition_ is triggered by an element entering or leaving the DOM as a result of a state change.

When a block (such as an `{#if ...}` block) is transitioning out, all elements inside it, including those that do not have their own transitions, are kept in the DOM until every transition in the block has been completed.

The `transition:` directive indicates a _bidirectional_ transition, which means it can be smoothly reversed while the transition is in progress.

```php-template
<script>
import { fade } from 'svelte/transition';

let visible = $state(false);
</script>

<button onclick={() => visible = !visible}>toggle</button>

{#if visible}
<div transition:fade>fades in and out</div>
{/if}
```

## Local vs global[](https://svelte.dev/docs/svelte/transition#Local-vs-global)

Transitions are local by default. Local transitions only play when the block they belong to is created or destroyed, _not_ when parent blocks are created or destroyed.

```csharp
{#if x}
{#if y}
<p transition:fade>fades in and out only when y changes</p>

<p transition:fade|global>fades in and out when x or y change</p>
{/if}
{/if}
```

## Built-in transitions[](https://svelte.dev/docs/svelte/transition#Built-in-transitions)

A selection of built-in transitions can be imported from the [`svelte/transition`](https://svelte.dev/docs/svelte/svelte-transition) module.

## Transition parameters[](https://svelte.dev/docs/svelte/transition#Transition-parameters)

Transitions can have parameters.

(The double `{{curlies}}` aren’t a special syntax; this is an object literal inside an expression tag.)

```css
{#if visible}
<div transition:fade={{ duration: 2000 }}>fades in and out over two seconds</div>
{/if}
```

## Custom transition functions[](https://svelte.dev/docs/svelte/transition#Custom-transition-functions)

```typescript
transition = (node: HTMLElement, params: any, options: { direction: 'in' | 'out' | 'both' }) => {
delay?: number,
duration?: number,
easing?: (t: number) => number,
css?: (t: number, u: number) => string,
tick?: (t: number, u: number) => void
}
```

Transitions can use custom functions. If the returned object has a `css` function, Svelte will generate keyframes for a [web animation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

The `t` argument passed to `css` is a value between `0` and `1` after the `easing` function has been applied. _In_ transitions run from `0` to `1`, _out_ transitions run from `1` to `0` — in other words, `1` is the element’s natural state, as though no transition had been applied. The `u` argument is equal to `1 - t`.

The function is called repeatedly _before_ the transition begins, with different `t` and `u` arguments.

A custom transition function can also return a `tick` function, which is called _during_ the transition with the same `t` and `u` arguments.

> If it’s possible to use `css` instead of `tick`, do so — web animations can run off the main thread, preventing jank on slower devices.

If a transition returns a function instead of a transition object, the function will be called in the next microtask. This allows multiple transitions to coordinate, making [crossfade effects](https://svelte.dev/tutorial/deferred-transitions) possible.

Transition functions also receive a third argument, `options`, which contains information about the transition.

Available values in the `options` object are:

-   `direction` - one of `in`, `out`, or `both` depending on the type of transition

## Transition events[](https://svelte.dev/docs/svelte/transition#Transition-events)

An element with transitions will dispatch the following events in addition to any standard DOM events:

-   `introstart`
-   `introend`
-   `outrostart`
-   `outroend`

```javascript
{#if visible}
<p
transition:fly={{ y: 200, duration: 2000 }}
onintrostart={() => (status = 'intro started')}
onoutrostart={() => (status = 'outro started')}
onintroend={() => (status = 'intro ended')}
onoutroend={() => (status = 'outro ended')}
>
Flies in and out
</p>
{/if}
```