There are two ways to set classes on elements: the `class` attribute, and the `class:` directive.

## Attributes[](https://svelte.dev/docs/svelte/class#Attributes)

Primitive values are treated like any other attribute:

```perl
<div class={large ? 'large' : 'small'}>...</div>
```

> For historical reasons, falsy values (like `false` and `NaN`) are stringified (`class="false"`), though `class={undefined}` (or `null`) cause the attribute to be omitted altogether. In a future version of Svelte, all falsy values will cause `class` to be omitted.

### Objects and arrays[](https://svelte.dev/docs/svelte/class#Attributes-Objects-and-arrays)

Since Svelte 5.16, `class` can be an object or array, and is converted to a string using [clsx](https://github.com/lukeed/clsx).

If the value is an object, the truthy keys are added:

```php-template
<script>
let { cool } = $props();
</script>

<!-- results in `class="cool"` if `cool` is truthy,
 `class="lame"` otherwise -->
<div class={{ cool, lame: !cool }}>...</div>
```

If the value is an array, the truthy values are combined:

```php-template
<!-- if `faded` and `large` are both truthy, results in
 `class="saturate-0 opacity-50 scale-200"` -->
<div class={[faded && 'saturate-0 opacity-50', large && 'scale-200']}>...</div>
```

Note that whether we’re using the array or object form, we can set multiple classes simultaneously with a single condition, which is particularly useful if you’re using things like Tailwind.

Arrays can contain arrays and objects, and clsx will flatten them. This is useful for combining local classes with props, for example:

The user of this component has the same flexibility to use a mixture of objects, arrays and strings:

Since Svelte 5.19, Svelte also exposes the `ClassValue` type, which is the type of value that the `class` attribute on elements accept. This is useful if you want to use a type-safe class name in component props:

```php-template
<script lang="ts">
import type { ClassValue } from 'svelte/elements';

const props: { class: ClassValue } = $props();
</script>

<div class={['original', props.class]}>...</div>
```

## The class: directive[](https://svelte.dev/docs/svelte/class#The-class:-directive)

Prior to Svelte 5.16, the `class:` directive was the most convenient way to set classes on elements conditionally.

```php-template
<!-- These are equivalent -->
<div class={{ cool, lame: !cool }}>...</div>
<div class:cool={cool} class:lame={!cool}>...</div>
```

As with other directives, we can use a shorthand when the name of the class coincides with the value:

```perl
<div class:cool class:lame={!cool}>...</div>
```

> Unless you’re using an older version of Svelte, consider avoiding `class:`, since the attribute is more powerful and composable.