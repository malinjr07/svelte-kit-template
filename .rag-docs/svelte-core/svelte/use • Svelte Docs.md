> In Svelte 5.29 and newer, consider using [attachments](https://svelte.dev/docs/svelte/@attach) instead, as they are more flexible and composable.

Actions are functions that are called when an element is mounted. They are added with the `use:` directive, and will typically use an `$effect` so that they can reset any state when the element is unmounted:

An action can be called with an argument:

The action is only called once (but not during server-side rendering) — it will _not_ run again if the argument changes.

> Legacy mode
> 
> Prior to the `$effect` rune, actions could return an object with `update` and `destroy` methods, where `update` would be called with the latest value of the argument if it changed. Using effects is preferred.

## Typing[](https://svelte.dev/docs/svelte/use#Typing)

The `Action` interface receives three optional type arguments — a node type (which can be `Element`, if the action applies to everything), a parameter, and any custom event handlers created by the action: