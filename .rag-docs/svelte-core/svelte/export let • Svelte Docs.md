In runes mode, [component props](https://svelte.dev/docs/svelte/basic-markup#Component-props) are declared with the [`$props`](https://svelte.dev/docs/svelte/$props) rune, allowing parent components to pass in data.

In legacy mode, props are marked with the `export` keyword, and can have a default value:

```php-template
<script>
export let foo;
export let bar = 'default value';

// Values that are passed in as props
// are immediately available
console.log({ foo });
</script>
```

The default value is used if it would otherwise be `undefined` when the component is created.

> Unlike in runes mode, if the parent component changes a prop from a defined value to `undefined`, it does not revert to the initial value.

Props without default values are considered _required_, and Svelte will print a warning during development if no value is provided, which you can squelch by specifying `undefined` as the default value:

```javascript
export let foo = undefined;
```

## Component exports[](https://svelte.dev/docs/svelte/legacy-export-let#Component-exports)

An exported `const`, `class` or `function` declaration is _not_ considered a prop — instead, it becomes part of the component’s API:

## Renaming props[](https://svelte.dev/docs/svelte/legacy-export-let#Renaming-props)

The `export` keyword can appear separately from the declaration. This is useful for renaming props, for example in the case of a reserved word: