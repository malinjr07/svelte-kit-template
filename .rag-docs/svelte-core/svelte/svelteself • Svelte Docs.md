The `<svelte:self>` element allows a component to include itself, recursively.

It cannot appear at the top level of your markup; it must be inside an if or each block or passed to a component’s slot to prevent an infinite loop.

```php-template
<script>
export let count;
</script>

{#if count > 0}
<p>counting down... {count}</p>
<svelte:self count={count - 1} />
{:else}
<p>lift-off!</p>
{/if}
```

> This concept is obsolete, as components can import themselves:
> 
> App