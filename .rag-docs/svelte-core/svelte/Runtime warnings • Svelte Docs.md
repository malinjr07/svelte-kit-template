## Client warnings[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings)

### assignment\_value\_stale[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-assignment_value_stale)

```vbnet
Assignment to `%property%` property (%location%) will evaluate to the right-hand side, not the value of `%property%` following the assignment. This may result in unexpected behaviour.
```

Given a case like this...

```php-template
<script>
let object = $state({ array: null });

function add() {
(object.array ??= []).push(object.array.length);
}
</script>

<button onclick={add}>add</button>
<p>items: {JSON.stringify(object.items)}</p>
```

...the array being pushed to when the button is first clicked is the `[]` on the right-hand side of the assignment, but the resulting value of `object.array` is an empty state proxy. As a result, the pushed value will be discarded.

You can fix this by separating it into two statements:

```php
function add() {
object.array ??= [];
object.array.push(object.array.length);
}
```

### await\_reactivity\_loss[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-await_reactivity_loss)

```perl
Detected reactivity loss when reading `%name%`. This happens when state is read in an async function after an earlier `await`
```

Svelte’s signal-based reactivity works by tracking which bits of state are read when a template or `$derived(...)` expression executes. If an expression contains an `await`, Svelte transforms it such that any state _after_ the `await` is also tracked — in other words, in a case like this...

```swift
let total = $derived(await a + b);
```

...both `a` and `b` are tracked, even though `b` is only read once `a` has resolved, after the initial execution.

This does _not_ apply to an `await` that is not ‘visible’ inside the expression. In a case like this...

```csharp
async function sum() {
return await a + b;
}

let total = $derived(await sum());
```

...`total` will depend on `a` (which is read immediately) but not `b` (which is not). The solution is to pass the values into the function:

```javascript
/**
 * @param {Promise<number>} a
 * @param {number} b
 */
async function sum(a, b) {
return await a + b;
}

let total = $derived(await sum(a, b));
```

### await\_waterfall[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-await_waterfall)

```bash
An async derived, `%name%` (%location%) was not read immediately after it resolved. This often indicates an unnecessary waterfall, which can slow down your app
```

In a case like this...

```swift
let a = $derived(await one());
let b = $derived(await two());
```

...the second `$derived` will not be created until the first one has resolved. Since `await two()` does not depend on the value of `a`, this delay, often described as a ‘waterfall’, is unnecessary.

(Note that if the values of `await one()` and `await two()` subsequently change, they can do so concurrently — the waterfall only occurs when the deriveds are first created.)

You can solve this by creating the promises first and _then_ awaiting them:

```swift
let aPromise = $derived(one());
let bPromise = $derived(two());

let a = $derived(await aPromise);
let b = $derived(await bPromise);
```

### binding\_property\_non\_reactive[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-binding_property_non_reactive)

```vbnet
`%binding%` is binding to a non-reactive property
```

```vbnet
`%binding%` (%location%) is binding to a non-reactive property
```

### console\_log\_state[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-console_log_state)

```javascript
Your `console.%method%` contained `$state` proxies. Consider using `$inspect(...)` or `$state.snapshot(...)` instead
```

When logging a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), browser devtools will log the proxy itself rather than the value it represents. In the case of Svelte, the ‘target’ of a `$state` proxy might not resemble its current value, which can be confusing.

The easiest way to log a value as it changes over time is to use the [`$inspect`](https://svelte.dev/docs/svelte/$inspect) rune. Alternatively, to log things on a one-off basis (for example, inside an event handler) you can use [`$state.snapshot`](https://svelte.dev/docs/svelte/$state#$state.snapshot) to take a snapshot of the current value.

### event\_handler\_invalid[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-event_handler_invalid)

```css
%handler% should be a function. Did you mean to %suggestion%?
```

### hydratable\_missing\_but\_expected[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-hydratable_missing_but_expected)

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

### hydration\_attribute\_changed[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-hydration_attribute_changed)

```go
The `%attribute%` attribute on `%html%` changed its value between server and client renders. The client value, `%value%`, will be ignored in favour of the server value
```

Certain attributes like `src` on an `<img>` element will not be repaired during hydration, i.e. the server value will be kept. That’s because updating these attributes can cause the image to be refetched (or in the case of an `<iframe>`, for the frame to be reloaded), even if they resolve to the same resource.

To fix this, either silence the warning with a [`svelte-ignore`](https://svelte.dev/docs/svelte/basic-markup#Comments) comment, or ensure that the value stays the same between server and client. If you really need the value to change on hydration, you can force an update like this:

```php-template
<script>
let { src } = $props();

if (typeof window !== 'undefined') {
// stash the value...
const initial = src;

// unset it...
src = undefined;

$effect(() => {
// ...and reset after we've mounted
src = initial;
});
}
</script>

<img {src} />
```

### hydration\_html\_changed[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-hydration_html_changed)

```less
The value of an `{@html ...}` block changed between server and client renders. The client value will be ignored in favour of the server value
```

```less
The value of an `{@html ...}` block %location% changed between server and client renders. The client value will be ignored in favour of the server value
```

If the `{@html ...}` value changes between the server and the client, it will not be repaired during hydration, i.e. the server value will be kept. That’s because change detection during hydration is expensive and usually unnecessary.

To fix this, either silence the warning with a [`svelte-ignore`](https://svelte.dev/docs/svelte/basic-markup#Comments) comment, or ensure that the value stays the same between server and client. If you really need the value to change on hydration, you can force an update like this:

```php-template
<script>
let { markup } = $props();

if (typeof window !== 'undefined') {
// stash the value...
const initial = markup;

// unset it...
markup = undefined;

$effect(() => {
// ...and reset after we've mounted
markup = initial;
});
}
</script>

{@html markup}
```

### hydration\_mismatch[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-hydration_mismatch)

```sql
Hydration failed because the initial UI does not match what was rendered on the server
```

```lua
Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
```

This warning is thrown when Svelte encounters an error while hydrating the HTML from the server. During hydration, Svelte walks the DOM, expecting a certain structure. If that structure is different (for example because the HTML was repaired by the DOM because of invalid HTML), then Svelte will run into issues, resulting in this warning.

During development, this error is often preceded by a `console.error` detailing the offending HTML, which needs fixing.

### invalid\_raw\_snippet\_render[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-invalid_raw_snippet_render)

```javascript
The `render` function passed to `createRawSnippet` should return HTML for a single element
```

### legacy\_recursive\_reactive\_block[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-legacy_recursive_reactive_block)

```perl
Detected a migrated `$:` reactive block in `%filename%` that both accesses and updates the same reactive value. This may cause recursive updates when converted to an `$effect`.
```

### lifecycle\_double\_unmount[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-lifecycle_double_unmount)

```css
Tried to unmount a component that was not mounted
```

### ownership\_invalid\_binding[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-ownership_invalid_binding)

```typescript
%parent% passed property `%prop%` to %child% with `bind:`, but its parent component %owner% did not declare `%prop%` as a binding. Consider creating a binding between %owner% and %parent% (e.g. `bind:%prop%={...}` instead of `%prop%={...}`)
```

Consider three components `GrandParent`, `Parent` and `Child`. If you do `<GrandParent bind:value>`, inside `GrandParent` pass on the variable via `<Parent {value} />` (note the missing `bind:`) and then do `<Child bind:value>` inside `Parent`, this warning is thrown.

To fix it, `bind:` to the value instead of just passing a property (i.e. in this example do `<Parent bind:value />`).

### ownership\_invalid\_mutation[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-ownership_invalid_mutation)

```csharp
Mutating unbound props (`%name%`, at %location%) is strongly discouraged. Consider using `bind:%prop%={...}` in %parent% (or using a callback) instead
```

Consider the following code:

`Child` is mutating `person` which is owned by `App` without being explicitly “allowed” to do so. This is strongly discouraged since it can create code that is hard to reason about at scale (“who mutated this value?”), hence the warning.

To fix it, either create callback props to communicate changes, or mark `person` as [`$bindable`](https://svelte.dev/docs/svelte/$bindable).

### select\_multiple\_invalid\_value[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-select_multiple_invalid_value)

```vbnet
The `value` property of a `<select multiple>` element should be an array, but it received a non-array value. The selection will be kept as is.
```

When using `<select multiple value={...}>`, Svelte will mark all selected `<option>` elements as selected by iterating over the array passed to `value`. If `value` is not an array, Svelte will emit this warning and keep the selected options as they are.

To silence the warning, ensure that `value`:

-   is an array for an explicit selection
-   is `null` or `undefined` to keep the selection as is

### state\_proxy\_equality\_mismatch[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-state_proxy_equality_mismatch)

```javascript
Reactive `$state(...)` proxies and the values they proxy have different identities. Because of this, comparisons with `%operator%` will produce unexpected results
```

`$state(...)` creates a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) of the value it is passed. The proxy and the value have different identities, meaning equality checks will always return `false`:

```php-template
<script>
let value = { foo: 'bar' };
let proxy = $state(value);

value === proxy; // always false
</script>
```

To resolve this, ensure you’re comparing values where both values were created with `$state(...)`, or neither were. Note that `$state.raw(...)` will _not_ create a state proxy.

### state\_proxy\_unmount[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-state_proxy_unmount)

```css
Tried to unmount a state proxy, rather than a component
```

`unmount` was called with a state proxy:

```swift
let component = $state(mount(Component, { target }));

// later...
unmount(component);
```

Avoid using `$state` here. If `component` _does_ need to be reactive for some reason, use `$state.raw` instead.

### svelte\_boundary\_reset\_noop[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-svelte_boundary_reset_noop)

```sql
A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
```

When an error occurs while rendering the contents of a [`<svelte:boundary>`](https://svelte.dev/docs/svelte/svelte-boundary), the `onerror` handler is called with the error plus a `reset` function that attempts to re-render the contents.

This `reset` function should only be called once. After that, it has no effect — in a case like this, where a reference to `reset` is stored outside the boundary, clicking the button while `<Contents />` is rendered will _not_ cause the contents to be rendered again.

```php-template
<script>
let reset;
</script>

<button onclick={reset}>reset</button>

<svelte:boundary onerror={(e, r) => (reset = r)}>
<!-- contents -->

{#snippet failed(e)}
<p>oops! {e.message}</p>
{/snippet}
</svelte:boundary>
```

### transition\_slide\_display[](https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-transition_slide_display)

```javascript
The `slide` transition does not work correctly for elements with `display: %value%`
```

The [slide](https://svelte.dev/docs/svelte/svelte-transition#slide) transition works by animating the `height` of the element, which requires a `display` style like `block`, `flex` or `grid`. It does not work for:

-   `display: inline` (which is the default for elements like `<span>`), and its variants like `inline-block`, `inline-flex` and `inline-grid`
-   `display: table` and `table-[name]`, which are the defaults for elements like `<table>` and `<tr>`
-   `display: contents`

### dynamic\_void\_element\_content[](https://svelte.dev/docs/svelte/runtime-warnings#Shared-warnings-dynamic_void_element_content)

```csharp
`<svelte:element this="%tag%">` is a void element — it cannot have content
```

Elements such as `<input>` cannot have content, any children passed to these elements will be ignored.

### state\_snapshot\_uncloneable[](https://svelte.dev/docs/svelte/runtime-warnings#Shared-warnings-state_snapshot_uncloneable)

```javascript
Value cannot be cloned with `$state.snapshot` — the original value was returned
```

```javascript
The following properties cannot be cloned with `$state.snapshot` — the return value contains the originals:

%properties%
```

`$state.snapshot` tries to clone the given value in order to return a reference that no longer changes. Certain objects may not be cloneable, in which case the original value is returned. In the following example, `property` is cloned, but `window` is not, because DOM elements are uncloneable:

```php
const object = $state({ property: 'this is cloneable', window })
const snapshot = $state.snapshot(object);
```