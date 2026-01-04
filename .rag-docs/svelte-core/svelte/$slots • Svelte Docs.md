In runes mode, we know which [snippets](https://svelte.dev/docs/svelte/snippet) were provided to a component, as they’re just normal props.

In legacy mode, the way to know if content was provided for a given slot is with the `$$slots` object, whose keys are the names of the slots passed into the component by the parent.

Card

```php-template
<div>
<slot name="title" />
{#if $$slots.description}
<!-- This <hr> and slot will render only if `slot="description"` is provided. -->
<hr />
<slot name="description" />
{/if}
</div>
```

App

```php-template
<Card>
<h1 slot="title">Blog Post Title</h1>
<!-- No slot named "description" was provided so the optional slot will not be rendered. -->
</Card>
```