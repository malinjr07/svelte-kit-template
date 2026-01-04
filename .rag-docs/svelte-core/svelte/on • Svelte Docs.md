In runes mode, event handlers are just like any other attribute or prop.

In legacy mode, we use the `on:` directive:

Handlers can be declared inline with no performance penalty:

```php-template
<button on:click={() => (count += 1)}>
count: {count}
</button>
```

Add _modifiers_ to element event handlers with the `|` character.

```php-template
<form on:submit|preventDefault={handleSubmit}>
<!-- the `submit` event's default is prevented,
     so the page won't reload -->
</form>
```

The following modifiers are available:

-   `preventDefault` — calls `event.preventDefault()` before running the handler
-   `stopPropagation` — calls `event.stopPropagation()`, preventing the event reaching the next element
-   `stopImmediatePropagation` — calls `event.stopImmediatePropagation()`, preventing other listeners of the same event from being fired.
-   `passive` — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it’s safe to do so)
-   `nonpassive` — explicitly set `passive: false`
-   `capture` — fires the handler during the _capture_ phase instead of the _bubbling_ phase
-   `once` — remove the handler after the first time it runs
-   `self` — only trigger handler if `event.target` is the element itself
-   `trusted` — only trigger handler if `event.isTrusted` is `true`. I.e. if the event is triggered by a user action.

Modifiers can be chained together, e.g. `on:click|once|capture={...}`.

If the `on:` directive is used without a value, the component will _forward_ the event, meaning that a consumer of the component can listen for it.

```csharp
<button on:click>
The component itself will emit the click event
</button>
```

It’s possible to have multiple event listeners for the same event:

## Component events[](https://svelte.dev/docs/svelte/legacy-on#Component-events)

Components can dispatch events by creating a _dispatcher_ when they are initialised:

`dispatch` creates a [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). If a second argument is provided, it becomes the `detail` property of the event object.

A consumer of this component can listen for the dispatched events:

```php-template
<script>
import Stepper from './Stepper.svelte';

let n = 0;
</script>

<Stepper
on:decrement={() => n -= 1}
on:increment={() => n += 1}
/>

<p>n: {n}</p>
```

Component events do not bubble — a parent component can only listen for events on its immediate children.

Other than `once`, modifiers are not valid on component event handlers.

> If you’re planning an eventual migration to Svelte 5, use callback props instead. This will make upgrading easier as `createEventDispatcher` is deprecated: