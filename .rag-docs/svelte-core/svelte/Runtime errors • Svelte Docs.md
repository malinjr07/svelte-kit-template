## Client errors[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors)

### async\_derived\_orphan[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-async_derived_orphan)

```javascript
Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
```

In Svelte there are two types of reaction — [`$derived`](https://svelte.dev/docs/svelte/$derived) and [`$effect`](https://svelte.dev/docs/svelte/$effect). Deriveds can be created anywhere, because they run _lazily_ and can be [garbage collected](https://developer.mozilla.org/en-US/docs/Glossary/Garbage_collection) if nothing references them. Effects, by contrast, keep running eagerly whenever their dependencies change, until they are destroyed.

Because of this, effects can only be created inside other effects (or [effect roots](https://svelte.dev/docs/svelte/$effect#$effect.root), such as the one that is created when you first mount a component) so that Svelte knows when to destroy them.

Some sleight of hand occurs when a derived contains an `await` expression: Since waiting until we read `{await getPromise()}` to call `getPromise` would be too late, we use an effect to instead call it proactively, notifying Svelte when the value is available. But since we’re using an effect, we can only create asynchronous deriveds inside another effect.

### bind\_invalid\_checkbox\_value[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-bind_invalid_checkbox_value)

```less
Using `bind:value` together with a checkbox input is not allowed. Use `bind:checked` instead
```

### bind\_invalid\_export[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-bind_invalid_export)

```javascript
Component %component% has an export named `%key%` that a consumer component is trying to access using `bind:%key%`, which is disallowed. Instead, use `bind:this` (e.g. `<%name% bind:this={component} />`) and then access the property on the bound component instance (e.g. `component.%key%`)
```

### bind\_not\_bindable[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-bind_not_bindable)

```bash
A component is attempting to bind to a non-bindable property `%key%` belonging to %component% (i.e. `<%name% bind:%key%={...}>`). To mark a property as bindable: `let { %key% = $bindable() } = $props()`
```

### component\_api\_changed[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-component_api_changed)

```csharp
Calling `%method%` on a component instance (of %component%) is no longer valid in Svelte 5
```

See the [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more information.

### component\_api\_invalid\_new[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-component_api_invalid_new)

```vbnet
Attempted to instantiate %component% with `new %name%`, which is no longer valid in Svelte 5. If this component is not under your control, set the `compatibility.componentApi` compiler option to `4` to keep it working.
```

See the [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more information.

### derived\_references\_self[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-derived_references_self)

```css
A derived value cannot reference itself recursively
```

### each\_key\_duplicate[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-each_key_duplicate)

```css
Keyed each block has duplicate key at indexes %a% and %b%
```

```css
Keyed each block has duplicate key `%value%` at indexes %a% and %b%
```

### effect\_in\_teardown[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-effect_in_teardown)

```javascript
`%rune%` cannot be used inside an effect cleanup function
```

### effect\_in\_unowned\_derived[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-effect_in_unowned_derived)

```scss
Effect cannot be created inside a `$derived` value that was not itself created inside an effect
```

### effect\_orphan[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-effect_orphan)

```scss
`%rune%` can only be used inside an effect (e.g. during component initialisation)
```

### effect\_pending\_outside\_reaction[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-effect_pending_outside_reaction)

```scss
`$effect.pending()` can only be called inside an effect or derived
```

### effect\_update\_depth\_exceeded[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-effect_update_depth_exceeded)

```sql
Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
```

If an effect updates some state that it also depends on, it will re-run, potentially in a loop:

```swift
let count = $state(0);

$effect(() => {
// this both reads and writes `count`,
// so will run in an infinite loop
count += 1;
});
```

(Svelte intervenes before this can crash your browser tab.)

The same applies to array mutations, since these both read and write to the array:

```php
let array = $state(['hello']);

$effect(() => {
array.push('goodbye');
});
```

Note that it’s fine for an effect to re-run itself as long as it ‘settles’:

```php
$effect(() => {
// this is okay, because sorting an already-sorted array
// won't result in a mutation
array.sort();
});
```

Often when encountering this issue, the value in question shouldn’t be state (for example, if you are pushing to a `logs` array in an effect, make `logs` a normal array rather than `$state([])`). In the rare cases where you really _do_ need to write to state in an effect — [which you should avoid](https://svelte.dev/docs/svelte/$effect#When-not-to-use-$effect) — you can read the state with [untrack](https://svelte.dev/docs/svelte/svelte#untrack) to avoid adding it as a dependency.

### flush\_sync\_in\_effect[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-flush_sync_in_effect)

```perl
Cannot use `flushSync` inside an effect
```

The `flushSync()` function can be used to flush any pending effects synchronously. It cannot be used if effects are currently being flushed — in other words, you can call it after a state change but _not_ inside an effect.

This restriction only applies when using the `experimental.async` option, which will be active by default in Svelte 6.

### fork\_discarded[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-fork_discarded)

```css
Cannot commit a fork that was already discarded
```

### fork\_timing[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-fork_timing)

```perl
Cannot create a fork inside an effect or when state changes are pending
```

### get\_abort\_signal\_outside\_reaction[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-get_abort_signal_outside_reaction)

```scss
`getAbortSignal()` can only be called inside an effect or derived
```

### hydratable\_missing\_but\_required[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-hydratable_missing_but_required)

```vbnet
Expected to find a hydratable with key `%key%` during hydration, but did not.
```

This can happen if you render a hydratable on the client that was not rendered on the server, and means that it was forced to fall back to running its function blockingly during hydration. This is bad for performance, as it blocks hydration until the asynchronous work completes.

```php-template
<script>
  import { hydratable } from 'svelte';

if (BROWSER) {
// bad! nothing can become interactive until this asynchronous work is done
await hydratable('foo', get_slow_random_number);
}
</script>
```

### hydration\_failed[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-hydration_failed)

```css
Failed to hydrate the application
```

### invalid\_snippet[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-invalid_snippet)

```javascript
Could not `{@render}` snippet due to the expression being `null` or `undefined`. Consider using optional chaining `{@render snippet?.()}`
```

### lifecycle\_legacy\_only[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-lifecycle_legacy_only)

```go
`%name%(...)` cannot be used in runes mode
```

### props\_invalid\_value[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-props_invalid_value)

```perl
Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
```

### props\_rest\_readonly[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-props_rest_readonly)

```typescript
Rest element properties of `$props()` such as `%property%` are readonly
```

### rune\_outside\_svelte[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-rune_outside_svelte)

```go
The `%rune%` rune is only available inside `.svelte` and `.svelte.js/ts` files
```

### set\_context\_after\_init[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-set_context_after_init)

```perl
`setContext` must be called when a component first initializes, not in a subsequent effect or after an `await` expression
```

This restriction only applies when using the `experimental.async` option, which will be active by default in Svelte 6.

### state\_descriptors\_fixed[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-state_descriptors_fixed)

```perl
Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
```

### state\_prototype\_fixed[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-state_prototype_fixed)

```bash
Cannot set prototype of `$state` object
```

### state\_unsafe\_mutation[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-state_unsafe_mutation)

```bash
Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
```

This error occurs when state is updated while evaluating a `$derived`. You might encounter it while trying to ‘derive’ two pieces of state in one go:

```php-template
<script>
let count = $state(0);

let even = $state(true);

let odd = $derived.by(() => {
even = count % 2 === 0;
return !even;
});
</script>

<button onclick={() => count++}>{count}</button>

<p>{count} is even: {even}</p>
<p>{count} is odd: {odd}</p>
```

This is forbidden because it introduces instability: if `<p>{count} is even: {even}</p>` is updated before `odd` is recalculated, `even` will be stale. In most cases the solution is to make everything derived:

```bash
let even = $derived(count % 2 === 0);
let odd = $derived(!even);
```

If side-effects are unavoidable, use [`$effect`](https://svelte.dev/docs/svelte/$effect) instead.

### svelte\_boundary\_reset\_onerror[](https://svelte.dev/docs/svelte/runtime-errors#Client-errors-svelte_boundary_reset_onerror)

```javascript
A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
```

If a [`<svelte:boundary>`](https://svelte.dev/docs/svelte/svelte-boundary) has an `onerror` function, it must not call the provided `reset` function synchronously since the boundary is still in a broken state. Typically, `reset()` is called later, once the error has been resolved.

If it’s possible to resolve the error inside the `onerror` callback, you must at least wait for the boundary to settle before calling `reset()`, for example using [`tick`](https://svelte.dev/docs/svelte/lifecycle-hooks#tick):

```php-template
<svelte:boundary onerror={async (error, reset) => {
fixTheError();
await tick();
reset();
}}>

</svelte:boundary>
```

## Server errors[](https://svelte.dev/docs/svelte/runtime-errors#Server-errors)

### async\_local\_storage\_unavailable[](https://svelte.dev/docs/svelte/runtime-errors#Server-errors-async_local_storage_unavailable)

```swift
The node API `AsyncLocalStorage` is not available, but is required to use async server rendering.
```

Some platforms require configuration flags to enable this API. Consult your platform’s documentation.

### await\_invalid[](https://svelte.dev/docs/svelte/runtime-errors#Server-errors-await_invalid)

```bash
Encountered asynchronous work while rendering synchronously.
```

You (or the framework you’re using) called [`render(...)`](https://svelte.dev/docs/svelte/svelte-server#render) with a component containing an `await` expression. Either `await` the result of `render` or wrap the `await` (or the component containing it) in a [`<svelte:boundary>`](https://svelte.dev/docs/svelte/svelte-boundary) with a `pending` snippet.

### html\_deprecated[](https://svelte.dev/docs/svelte/runtime-errors#Server-errors-html_deprecated)

```css
The `html` property of server render results has been deprecated. Use `body` instead.
```

### hydratable\_clobbering[](https://svelte.dev/docs/svelte/runtime-errors#Server-errors-hydratable_clobbering)

```vbnet
Attempted to set `hydratable` with key `%key%` twice with different values.

%stack%
```

This error occurs when using `hydratable` multiple times with the same key. To avoid this, you can:

-   Ensure all invocations with the same key result in the same value
-   Update the keys to make both instances unique

```php-template
<script>
  import { hydratable } from 'svelte';

  // which one should "win" and be serialized in the rendered response?
  const one = hydratable('not-unique', () => 1);
  const two = hydratable('not-unique', () => 2);
</script>
```

### hydratable\_serialization\_failed[](https://svelte.dev/docs/svelte/runtime-errors#Server-errors-hydratable_serialization_failed)

```javascript
Failed to serialize `hydratable` data for key `%key%`.

`hydratable` can serialize anything [`uneval` from `devalue`](https://npmjs.com/package/uneval) can, plus Promises.

Cause:
%stack%
```

### lifecycle\_function\_unavailable[](https://svelte.dev/docs/svelte/runtime-errors#Server-errors-lifecycle_function_unavailable)

```csharp
`%name%(...)` is not available on the server
```

Certain methods such as `mount` cannot be invoked while running in a server context. Avoid calling them eagerly, i.e. not during render.

### server\_context\_required[](https://svelte.dev/docs/svelte/runtime-errors#Server-errors-server_context_required)

```go
Could not resolve `render` context.
```

Certain functions such as `hydratable` cannot be invoked outside of a `render(...)` call, such as at the top level of a module.

### experimental\_async\_required[](https://svelte.dev/docs/svelte/runtime-errors#Shared-errors-experimental_async_required)

```perl
Cannot use `%name%(...)` unless the `experimental.async` compiler option is `true`
```

### invalid\_default\_snippet[](https://svelte.dev/docs/svelte/runtime-errors#Shared-errors-invalid_default_snippet)

```less
Cannot use `{@render children(...)}` if the parent component uses `let:` directives. Consider using a named snippet instead
```

This error would be thrown in a setup like this:

Parent

```php-template
<List {items} let:entry>
<span>{entry}</span>
</List>
```

Here, `List.svelte` is using `{@render children(item)` which means it expects `Parent.svelte` to use snippets. Instead, `Parent.svelte` uses the deprecated `let:` directive. This combination of APIs is incompatible, hence the error.

### invalid\_snippet\_arguments[](https://svelte.dev/docs/svelte/runtime-errors#Shared-errors-invalid_snippet_arguments)

```javascript
A snippet function was passed invalid arguments. Snippets should only be instantiated via `{@render ...}`
```

### lifecycle\_outside\_component[](https://svelte.dev/docs/svelte/runtime-errors#Shared-errors-lifecycle_outside_component)

```go
`%name%(...)` can only be used during component initialisation
```

Certain lifecycle methods can only be used during component initialisation. To fix this, make sure you’re invoking the method inside the _top level of the instance script_ of your component.

```php-template
<script>
import { onMount } from 'svelte';

function handleClick() {
// This is wrong
onMount(() => {})
}

// This is correct
onMount(() => {})
</script>

<button onclick={handleClick}>click me</button>
```

### missing\_context[](https://svelte.dev/docs/svelte/runtime-errors#Shared-errors-missing_context)

```bash
Context was not set in a parent component
```

The [`createContext()`](https://svelte.dev/docs/svelte/svelte#createContext) utility returns a `[get, set]` pair of functions. `get` will throw an error if `set` was not used to set the context in a parent component.

### snippet\_without\_render\_tag[](https://svelte.dev/docs/svelte/runtime-errors#Shared-errors-snippet_without_render_tag)

```less
Attempted to render a snippet without a `{@render}` block. This would cause the snippet code to be stringified instead of its content being rendered to the DOM. To fix this, change `{snippet}` to `{@render snippet()}`.
```

A component throwing this error will look something like this (`children` is not being rendered):

```php-template
<script>
let { children } = $props();
</script>

{children}
```

...or like this (a parent component is passing a snippet where a non-snippet value is expected):

Parent

```php-template
<ChildComponent>
  {#snippet label()}
<span>Hi!</span>
  {/snippet}
</ChildComponent>
```

### store\_invalid\_shape[](https://svelte.dev/docs/svelte/runtime-errors#Shared-errors-store_invalid_shape)

```javascript
`%name%` is not a store with a `subscribe` method
```

### svelte\_element\_invalid\_this\_value[](https://svelte.dev/docs/svelte/runtime-errors#Shared-errors-svelte_element_invalid_this_value)

```csharp
The `this` prop on `<svelte:element>` must be a string, if defined
```