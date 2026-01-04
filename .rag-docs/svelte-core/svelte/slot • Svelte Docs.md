In Svelte 5, content can be passed to components in the form of [snippets](https://svelte.dev/docs/svelte/snippet) and rendered using [render tags](https://svelte.dev/docs/svelte/@render).

In legacy mode, content inside component tags is considered _slotted content_, which can be rendered by the component using a `<slot>` element:

Modal

```php-template
<div class="modal">
<slot></slot>
</div>
```

> If you want to render a regular `<slot>` element, you can use `<svelte:element this={'slot'} />`.

## Named slots[](https://svelte.dev/docs/svelte/legacy-slots#Named-slots)

A component can have _named_ slots in addition to the default slot. On the parent side, add a `slot="..."` attribute to an element, component or [`<svelte:fragment>`](https://svelte.dev/docs/svelte/legacy-svelte-fragment) directly inside the component tags.

On the child side, add a corresponding `<slot name="...">` element:

Modal

```php-template
<div class="modal">
<slot></slot>
<hr>
<slot name="buttons"></slot>
</div>
```

## Fallback content[](https://svelte.dev/docs/svelte/legacy-slots#Fallback-content)

If no slotted content is provided, a component can define fallback content by putting it inside the `<slot>` element:

```php-template
<slot>
This will be rendered if no slotted content is provided
</slot>
```

## Passing data to slotted content[](https://svelte.dev/docs/svelte/legacy-slots#Passing-data-to-slotted-content)

Slots can be rendered zero or more times and can pass values _back_ to the parent using props. The parent exposes the values to the slot template using the `let:` directive.

FancyList

```php-template
<ul>
{#each items as data}
<li class="fancy">
<!-- 'item' here... -->
<slot item={process(data)} />
</li>
{/each}
</ul>
```

App

```php-template
<!-- ...corresponds to 'item' here: -->
<FancyList {items} let:item={processed}>
<div>{processed.text}</div>
</FancyList>
```

The usual shorthand rules apply — `let:item` is equivalent to `let:item={item}`, and `<slot {item}>` is equivalent to `<slot item={item}>`.

Named slots can also expose values. The `let:` directive goes on the element with the `slot` attribute.

FancyList

```perl
<ul>
{#each items as item}
<li class="fancy">
<slot name="item" item={process(data)} />
</li>
{/each}
</ul>

<slot name="footer" />
```

App

```php-template
<FancyList {items}>
<div slot="item" let:item>{item.text}</div>
<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</FancyList>
```