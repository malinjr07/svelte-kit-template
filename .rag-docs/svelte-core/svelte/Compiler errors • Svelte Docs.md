### animation\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#animation_duplicate)

```sql
An element can only have one 'animate' directive
```

### animation\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#animation_invalid_placement)

```go
An element that uses the `animate:` directive must be the only child of a keyed `{#each ...}` block
```

### animation\_missing\_key[](https://svelte.dev/docs/svelte/compiler-errors#animation_missing_key)

```graphql
An element that uses the `animate:` directive must be the only child of a keyed `{#each ...}` block. Did you forget to add a key to your each block?
```

### attribute\_contenteditable\_dynamic[](https://svelte.dev/docs/svelte/compiler-errors#attribute_contenteditable_dynamic)

```csharp
'contenteditable' attribute cannot be dynamic if element uses two-way binding
```

### attribute\_contenteditable\_missing[](https://svelte.dev/docs/svelte/compiler-errors#attribute_contenteditable_missing)

```csharp
'contenteditable' attribute is required for textContent, innerHTML and innerText two-way bindings
```

### attribute\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#attribute_duplicate)

```css
Attributes need to be unique
```

### attribute\_empty\_shorthand[](https://svelte.dev/docs/svelte/compiler-errors#attribute_empty_shorthand)

```php
Attribute shorthand cannot be empty
```

### attribute\_invalid\_event\_handler[](https://svelte.dev/docs/svelte/compiler-errors#attribute_invalid_event_handler)

```css
Event attribute must be a JavaScript expression, not a string
```

### attribute\_invalid\_multiple[](https://svelte.dev/docs/svelte/compiler-errors#attribute_invalid_multiple)

```csharp
'multiple' attribute must be static if select uses two-way binding
```

### attribute\_invalid\_name[](https://svelte.dev/docs/svelte/compiler-errors#attribute_invalid_name)

```csharp
'%name%' is not a valid attribute name
```

### attribute\_invalid\_sequence\_expression[](https://svelte.dev/docs/svelte/compiler-errors#attribute_invalid_sequence_expression)

```perl
Sequence expressions are not allowed as attribute/directive values in runes mode, unless wrapped in parentheses
```

### attribute\_invalid\_type[](https://svelte.dev/docs/svelte/compiler-errors#attribute_invalid_type)

```vbnet
'type' attribute must be a static text value if input uses two-way binding
```

### attribute\_unquoted\_sequence[](https://svelte.dev/docs/svelte/compiler-errors#attribute_unquoted_sequence)

```perl
Attribute values containing `{...}` must be enclosed in quote marks, unless the value only contains the expression
```

### bind\_group\_invalid\_expression[](https://svelte.dev/docs/svelte/compiler-errors#bind_group_invalid_expression)

```bash
`bind:group` can only bind to an Identifier or MemberExpression
```

### bind\_group\_invalid\_snippet\_parameter[](https://svelte.dev/docs/svelte/compiler-errors#bind_group_invalid_snippet_parameter)

```sql
Cannot `bind:group` to a snippet parameter
```

### bind\_invalid\_expression[](https://svelte.dev/docs/svelte/compiler-errors#bind_invalid_expression)

```python
Can only bind to an Identifier or MemberExpression or a `{get, set}` pair
```

### bind\_invalid\_name[](https://svelte.dev/docs/svelte/compiler-errors#bind_invalid_name)

```bash
`bind:%name%` is not a valid binding
```

```bash
`bind:%name%` is not a valid binding. %explanation%
```

### bind\_invalid\_parens[](https://svelte.dev/docs/svelte/compiler-errors#bind_invalid_parens)

```bash
`bind:%name%={get, set}` must not have surrounding parentheses
```

### bind\_invalid\_target[](https://svelte.dev/docs/svelte/compiler-errors#bind_invalid_target)

```javascript
`bind:%name%` can only be used with %elements%
```

### bind\_invalid\_value[](https://svelte.dev/docs/svelte/compiler-errors#bind_invalid_value)

```perl
Can only bind to state or props
```

### bindable\_invalid\_location[](https://svelte.dev/docs/svelte/compiler-errors#bindable_invalid_location)

```scss
`$bindable()` can only be used inside a `$props()` declaration
```

### block\_duplicate\_clause[](https://svelte.dev/docs/svelte/compiler-errors#block_duplicate_clause)

```css
%name% cannot appear more than once within a block
```

### block\_invalid\_continuation\_placement[](https://svelte.dev/docs/svelte/compiler-errors#block_invalid_continuation_placement)

```css
{:...} block is invalid at this position (did you forget to close the preceding element or block?)
```

### block\_invalid\_elseif[](https://svelte.dev/docs/svelte/compiler-errors#block_invalid_elseif)

```rust
'elseif' should be 'else if'
```

### block\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#block_invalid_placement)

```csharp
{#%name% ...} block cannot be %location%
```

### block\_unclosed[](https://svelte.dev/docs/svelte/compiler-errors#block_unclosed)

### block\_unexpected\_character[](https://svelte.dev/docs/svelte/compiler-errors#block_unexpected_character)

```sql
Expected a `%character%` character immediately following the opening bracket
```

### block\_unexpected\_close[](https://svelte.dev/docs/svelte/compiler-errors#block_unexpected_close)

```scss
Unexpected block closing tag
```

### component\_invalid\_directive[](https://svelte.dev/docs/svelte/compiler-errors#component_invalid_directive)

```graphql
This type of directive is not valid on components
```

### const\_tag\_cycle[](https://svelte.dev/docs/svelte/compiler-errors#const_tag_cycle)

```sql
Cyclical dependency detected: %cycle%
```

### const\_tag\_invalid\_expression[](https://svelte.dev/docs/svelte/compiler-errors#const_tag_invalid_expression)

```less
{@const ...} must consist of a single variable declaration
```

### const\_tag\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#const_tag_invalid_placement)

```go
`{@const}` must be the immediate child of `{#snippet}`, `{#if}`, `{:else if}`, `{:else}`, `{#each}`, `{:then}`, `{:catch}`, `<svelte:fragment>`, `<svelte:boundary` or `<Component>`
```

### const\_tag\_invalid\_reference[](https://svelte.dev/docs/svelte/compiler-errors#const_tag_invalid_reference)

```kotlin
The `{@const %name% = ...}` declaration is not available in this snippet
```

The following is an error:

```perl
<svelte:boundary>
{@const foo = 'bar'}

{#snippet failed()}
{foo}
{/snippet}
</svelte:boundary>
```

Here, `foo` is not available inside `failed`. The top level code inside `<svelte:boundary>` becomes part of the implicit `children` snippet, in other words the above code is equivalent to this:

```bash
<svelte:boundary>
{#snippet children()}
{@const foo = 'bar'}
{/snippet}

{#snippet failed()}
{foo}
{/snippet}
</svelte:boundary>
```

The same applies to components:

```php-template
<Component>
{@const foo = 'bar'}

{#snippet someProp()}
<!-- error -->
{foo}
{/snippet}
</Component>
```

### constant\_assignment[](https://svelte.dev/docs/svelte/compiler-errors#constant_assignment)

### constant\_binding[](https://svelte.dev/docs/svelte/compiler-errors#constant_binding)

### css\_empty\_declaration[](https://svelte.dev/docs/svelte/compiler-errors#css_empty_declaration)

```php
Declaration cannot be empty
```

### css\_expected\_identifier[](https://svelte.dev/docs/svelte/compiler-errors#css_expected_identifier)

```css
Expected a valid CSS identifier
```

### css\_global\_block\_invalid\_combinator[](https://svelte.dev/docs/svelte/compiler-errors#css_global_block_invalid_combinator)

```go
A `:global` selector cannot follow a `%name%` combinator
```

### css\_global\_block\_invalid\_declaration[](https://svelte.dev/docs/svelte/compiler-errors#css_global_block_invalid_declaration)

```css
A top-level `:global {...}` block can only contain rules, not declarations
```

### css\_global\_block\_invalid\_list[](https://svelte.dev/docs/svelte/compiler-errors#css_global_block_invalid_list)

```vbnet
A `:global` selector cannot be part of a selector list with entries that don't contain `:global`
```

The following CSS is invalid:

```css
:global, x {
y {
color: red;
}
}
```

This is mixing a `:global` block, which means “everything in here is unscoped”, with a scoped selector (`x` in this case). As a result it’s not possible to transform the inner selector (`y` in this case) into something that satisfies both requirements. You therefore have to split this up into two selectors:

```css
:global {
y {
color: red;
}
}

x y {
color: red;
}
```

### css\_global\_block\_invalid\_modifier[](https://svelte.dev/docs/svelte/compiler-errors#css_global_block_invalid_modifier)

```csharp
A `:global` selector cannot modify an existing selector
```

### css\_global\_block\_invalid\_modifier\_start[](https://svelte.dev/docs/svelte/compiler-errors#css_global_block_invalid_modifier_start)

```csharp
A `:global` selector can only be modified if it is a descendant of other selectors
```

### css\_global\_block\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#css_global_block_invalid_placement)

```less
A `:global` selector cannot be inside a pseudoclass
```

### css\_global\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#css_global_invalid_placement)

```sql
`:global(...)` can be at the start or end of a selector sequence, but not in the middle
```

### css\_global\_invalid\_selector[](https://svelte.dev/docs/svelte/compiler-errors#css_global_invalid_selector)

```sql
`:global(...)` must contain exactly one selector
```

### css\_global\_invalid\_selector\_list[](https://svelte.dev/docs/svelte/compiler-errors#css_global_invalid_selector_list)

```python
`:global(...)` must not contain type or universal selectors when used in a compound selector
```

### css\_nesting\_selector\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#css_nesting_selector_invalid_placement)

```css
Nesting selectors can only be used inside a rule or as the first selector inside a lone `:global(...)`
```

### css\_selector\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#css_selector_invalid)

### css\_type\_selector\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#css_type_selector_invalid_placement)

```csharp
`:global(...)` must not be followed by a type selector
```

### debug\_tag\_invalid\_arguments[](https://svelte.dev/docs/svelte/compiler-errors#debug_tag_invalid_arguments)

```less
{@debug ...} arguments must be identifiers, not arbitrary expressions
```

### declaration\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#declaration_duplicate)

```go
`%name%` has already been declared
```

### declaration\_duplicate\_module\_import[](https://svelte.dev/docs/svelte/compiler-errors#declaration_duplicate_module_import)

```typescript
Cannot declare a variable with the same name as an import inside `<script module>`
```

### derived\_invalid\_export[](https://svelte.dev/docs/svelte/compiler-errors#derived_invalid_export)

```javascript
Cannot export derived state from a module. To expose the current derived value, export a function returning its value
```

### directive\_invalid\_value[](https://svelte.dev/docs/svelte/compiler-errors#directive_invalid_value)

```css
Directive value must be a JavaScript expression enclosed in curly braces
```

### directive\_missing\_name[](https://svelte.dev/docs/svelte/compiler-errors#directive_missing_name)

```bash
`%type%` name cannot be empty
```

### dollar\_binding\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#dollar_binding_invalid)

```vbnet
The $ name is reserved, and cannot be used for variables and imports
```

### dollar\_prefix\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#dollar_prefix_invalid)

```swift
The $ prefix is reserved, and cannot be used for variables and imports
```

### duplicate\_class\_field[](https://svelte.dev/docs/svelte/compiler-errors#duplicate_class_field)

```go
`%name%` has already been declared
```

### each\_item\_invalid\_assignment[](https://svelte.dev/docs/svelte/compiler-errors#each_item_invalid_assignment)

```perl
Cannot reassign or bind to each block argument in runes mode. Use the array and index variables instead (e.g. `array[i] = value` instead of `entry = value`, or `bind:value={array[i]}` instead of `bind:value={entry}`)
```

In legacy mode, it was possible to reassign or bind to the each block argument itself:

```php-template
<script>
let array = [1, 2, 3];
</script>

{#each array as entry}
<!-- reassignment -->
<button on:click={() => entry = 4}>change</button>

<!-- binding -->
<input bind:value={entry}>
{/each}
```

This turned out to be buggy and unpredictable, particularly when working with derived values (such as `array.map(...)`), and as such is forbidden in runes mode. You can achieve the same outcome by using the index instead:

```php-template
<script>
let array = $state([1, 2, 3]);
</script>

{#each array as entry, i}
<!-- reassignment -->
<button onclick={() => array[i] = 4}>change</button>

<!-- binding -->
<input bind:value={array[i]}>
{/each}
```

### each\_key\_without\_as[](https://svelte.dev/docs/svelte/compiler-errors#each_key_without_as)

```go
An `{#each ...}` block without an `as` clause cannot have a key
```

### effect\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#effect_invalid_placement)

```javascript
`$effect()` can only be used as an expression statement
```

### element\_invalid\_closing\_tag[](https://svelte.dev/docs/svelte/compiler-errors#element_invalid_closing_tag)

```perl
`</%name%>` attempted to close an element that was not open
```

### element\_invalid\_closing\_tag\_autoclosed[](https://svelte.dev/docs/svelte/compiler-errors#element_invalid_closing_tag_autoclosed)

```go
`</%name%>` attempted to close element that was already automatically closed by `<%reason%>` (cannot nest `<%reason%>` inside `<%name%>`)
```

### element\_unclosed[](https://svelte.dev/docs/svelte/compiler-errors#element_unclosed)

### event\_handler\_invalid\_component\_modifier[](https://svelte.dev/docs/svelte/compiler-errors#event_handler_invalid_component_modifier)

```vbnet
Event modifiers other than 'once' can only be used on DOM elements
```

### event\_handler\_invalid\_modifier[](https://svelte.dev/docs/svelte/compiler-errors#event_handler_invalid_modifier)

```csharp
Valid event modifiers are %list%
```

### event\_handler\_invalid\_modifier\_combination[](https://svelte.dev/docs/svelte/compiler-errors#event_handler_invalid_modifier_combination)

```bash
The '%modifier1%' and '%modifier2%' modifiers cannot be used together
```

### expected\_attribute\_value[](https://svelte.dev/docs/svelte/compiler-errors#expected_attribute_value)

### expected\_block\_type[](https://svelte.dev/docs/svelte/compiler-errors#expected_block_type)

```python
Expected 'if', 'each', 'await', 'key' or 'snippet'
```

### expected\_identifier[](https://svelte.dev/docs/svelte/compiler-errors#expected_identifier)

### expected\_pattern[](https://svelte.dev/docs/svelte/compiler-errors#expected_pattern)

```css
Expected identifier or destructure pattern
```

### expected\_tag[](https://svelte.dev/docs/svelte/compiler-errors#expected_tag)

```python
Expected 'html', 'render', 'attach', 'const', or 'debug'
```

### expected\_token[](https://svelte.dev/docs/svelte/compiler-errors#expected_token)

### expected\_whitespace[](https://svelte.dev/docs/svelte/compiler-errors#expected_whitespace)

### experimental\_async[](https://svelte.dev/docs/svelte/compiler-errors#experimental_async)

```perl
Cannot use `await` in deriveds and template expressions, or at the top level of a component, unless the `experimental.async` compiler option is `true`
```

### export\_undefined[](https://svelte.dev/docs/svelte/compiler-errors#export_undefined)

### global\_reference\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#global_reference_invalid)

```javascript
`%name%` is an illegal variable name. To reference a global variable called `%name%`, use `globalThis.%name%`
```

### host\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#host_invalid_placement)

```scss
`$host()` can only be used inside custom element component instances
```

### illegal\_await\_expression[](https://svelte.dev/docs/svelte/compiler-errors#illegal_await_expression)

```javascript
`use:`, `transition:` and `animate:` directives, attachments and bindings do not support await expressions
```

### illegal\_element\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#illegal_element_attribute)

```r
`<%name%>` does not support non-event attributes or spread attributes
```

### import\_svelte\_internal\_forbidden[](https://svelte.dev/docs/svelte/compiler-errors#import_svelte_internal_forbidden)

```csharp
Imports of `svelte/internal/*` are forbidden. It contains private runtime code which is subject to change without notice. If you're importing from `svelte/internal/*` to work around a limitation of Svelte, please open an issue at https://github.com/sveltejs/svelte and explain your use case
```

### inspect\_trace\_generator[](https://svelte.dev/docs/svelte/compiler-errors#inspect_trace_generator)

```bash
`$inspect.trace(...)` cannot be used inside a generator function
```

### inspect\_trace\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#inspect_trace_invalid_placement)

```bash
`$inspect.trace(...)` must be the first statement of a function body
```

### invalid\_arguments\_usage[](https://svelte.dev/docs/svelte/compiler-errors#invalid_arguments_usage)

```css
The arguments keyword cannot be used within the template or at the top level of a component
```

### js\_parse\_error[](https://svelte.dev/docs/svelte/compiler-errors#js_parse_error)

### legacy\_await\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#legacy_await_invalid)

```css
Cannot use `await` in deriveds and template expressions, or at the top level of a component, unless in runes mode
```

### legacy\_export\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#legacy_export_invalid)

```perl
Cannot use `export let` in runes mode — use `$props()` instead
```

### legacy\_props\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#legacy_props_invalid)

```perl
Cannot use `$$props` in runes mode
```

### legacy\_reactive\_statement\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#legacy_reactive_statement_invalid)

```perl
`$:` is not allowed in runes mode, use `$derived` or `$effect` instead
```

### legacy\_rest\_props\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#legacy_rest_props_invalid)

```perl
Cannot use `$$restProps` in runes mode
```

### let\_directive\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#let_directive_invalid_placement)

```bash
`let:` directive at invalid position
```

### mixed\_event\_handler\_syntaxes[](https://svelte.dev/docs/svelte/compiler-errors#mixed_event_handler_syntaxes)

```csharp
Mixing old (on:%name%) and new syntaxes for event handling is not allowed. Use only the on%name% syntax
```

### module\_illegal\_default\_export[](https://svelte.dev/docs/svelte/compiler-errors#module_illegal_default_export)

```cpp
A component cannot have a default export
```

### node\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#node_invalid_placement)

```shell
%message%. The browser will 'repair' the HTML (by moving, removing, or inserting elements) which breaks Svelte's assumptions about the structure of your components.
```

HTML restricts where certain elements can appear. In case of a violation the browser will ‘repair’ the HTML in a way that breaks Svelte’s assumptions about the structure of your components. Some examples:

-   `<p>hello <div>world</div></p>` will result in `<p>hello </p><div>world</div><p></p>` (the `<div>` autoclosed the `<p>` because `<p>` cannot contain block-level elements)
-   `<option><div>option a</div></option>` will result in `<option>option a</option>` (the `<div>` is removed)
-   `<table><tr><td>cell</td></tr></table>` will result in `<table><tbody><tr><td>cell</td></tr></tbody></table>` (a `<tbody>` is auto-inserted)

### options\_invalid\_value[](https://svelte.dev/docs/svelte/compiler-errors#options_invalid_value)

```less
Invalid compiler option: %details%
```

### options\_removed[](https://svelte.dev/docs/svelte/compiler-errors#options_removed)

```less
Invalid compiler option: %details%
```

### options\_unrecognised[](https://svelte.dev/docs/svelte/compiler-errors#options_unrecognised)

```css
Unrecognised compiler option %keypath%
```

### props\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#props_duplicate)

```perl
Cannot use `%rune%()` more than once
```

### props\_id\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#props_id_invalid_placement)

```bash
`$props.id()` can only be used at the top level of components as a variable declaration initializer
```

### props\_illegal\_name[](https://svelte.dev/docs/svelte/compiler-errors#props_illegal_name)

```python
Declaring or accessing a prop starting with `$$` is illegal (they are reserved for Svelte internals)
```

### props\_invalid\_identifier[](https://svelte.dev/docs/svelte/compiler-errors#props_invalid_identifier)

```sql
`$props()` can only be used with an object destructuring pattern
```

### props\_invalid\_pattern[](https://svelte.dev/docs/svelte/compiler-errors#props_invalid_pattern)

```perl
`$props()` assignment must not contain nested properties or computed keys
```

### props\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#props_invalid_placement)

```javascript
`$props()` can only be used at the top level of components as a variable declaration initializer
```

### reactive\_declaration\_cycle[](https://svelte.dev/docs/svelte/compiler-errors#reactive_declaration_cycle)

```sql
Cyclical dependency detected: %cycle%
```

### render\_tag\_invalid\_call\_expression[](https://svelte.dev/docs/svelte/compiler-errors#render_tag_invalid_call_expression)

```vbnet
Calling a snippet function using apply, bind or call is not allowed
```

### render\_tag\_invalid\_expression[](https://svelte.dev/docs/svelte/compiler-errors#render_tag_invalid_expression)

```css
`{@render ...}` tags can only contain call expressions
```

### render\_tag\_invalid\_spread\_argument[](https://svelte.dev/docs/svelte/compiler-errors#render_tag_invalid_spread_argument)

```less
cannot use spread arguments in `{@render ...}` tags
```

### rune\_invalid\_arguments[](https://svelte.dev/docs/svelte/compiler-errors#rune_invalid_arguments)

```javascript
`%rune%` cannot be called with arguments
```

### rune\_invalid\_arguments\_length[](https://svelte.dev/docs/svelte/compiler-errors#rune_invalid_arguments_length)

```csharp
`%rune%` must be called with %args%
```

### rune\_invalid\_computed\_property[](https://svelte.dev/docs/svelte/compiler-errors#rune_invalid_computed_property)

```css
Cannot access a computed property of a rune
```

### rune\_invalid\_name[](https://svelte.dev/docs/svelte/compiler-errors#rune_invalid_name)

```go
`%name%` is not a valid rune
```

### rune\_invalid\_spread[](https://svelte.dev/docs/svelte/compiler-errors#rune_invalid_spread)

```javascript
`%rune%` cannot be called with a spread argument
```

### rune\_invalid\_usage[](https://svelte.dev/docs/svelte/compiler-errors#rune_invalid_usage)

```go
Cannot use `%rune%` rune in non-runes mode
```

### rune\_missing\_parentheses[](https://svelte.dev/docs/svelte/compiler-errors#rune_missing_parentheses)

```css
Cannot use rune without parentheses
```

### rune\_removed[](https://svelte.dev/docs/svelte/compiler-errors#rune_removed)

```go
The `%name%` rune has been removed
```

### rune\_renamed[](https://svelte.dev/docs/svelte/compiler-errors#rune_renamed)

```go
`%name%` is now `%replacement%`
```

### runes\_mode\_invalid\_import[](https://svelte.dev/docs/svelte/compiler-errors#runes_mode_invalid_import)

```shell
%name% cannot be used in runes mode
```

### script\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#script_duplicate)

```css
A component can have a single top-level `<script>` element and/or a single top-level `<script module>` element
```

### script\_invalid\_attribute\_value[](https://svelte.dev/docs/svelte/compiler-errors#script_invalid_attribute_value)

```typescript
If the `%name%` attribute is supplied, it must be a boolean attribute
```

### script\_invalid\_context[](https://svelte.dev/docs/svelte/compiler-errors#script_invalid_context)

```csharp
If the context attribute is supplied, its value must be "module"
```

### script\_reserved\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#script_reserved_attribute)

```csharp
The `%name%` attribute is reserved and cannot be used
```

### slot\_attribute\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#slot_attribute_duplicate)

```bash
Duplicate slot name '%name%' in <%component%>
```

### slot\_attribute\_invalid[](https://svelte.dev/docs/svelte/compiler-errors#slot_attribute_invalid)

```cpp
slot attribute must be a static value
```

### slot\_attribute\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#slot_attribute_invalid_placement)

```python
Element with a slot='...' attribute must be a child of a component or a descendant of a custom element
```

### slot\_default\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#slot_default_duplicate)

```cpp
Found default slot content alongside an explicit slot="default"
```

### slot\_element\_invalid\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#slot_element_invalid_attribute)

```javascript
`<slot>` can only receive attributes and (optionally) let directives
```

### slot\_element\_invalid\_name[](https://svelte.dev/docs/svelte/compiler-errors#slot_element_invalid_name)

```cpp
slot attribute must be a static value
```

### slot\_element\_invalid\_name\_default[](https://svelte.dev/docs/svelte/compiler-errors#slot_element_invalid_name_default)

```csharp
`default` is a reserved word — it cannot be used as a slot name
```

### slot\_snippet\_conflict[](https://svelte.dev/docs/svelte/compiler-errors#slot_snippet_conflict)

```perl
Cannot use `<slot>` syntax and `{@render ...}` tags in the same component. Migrate towards `{@render ...}` tags completely
```

### snippet\_conflict[](https://svelte.dev/docs/svelte/compiler-errors#snippet_conflict)

```css
Cannot use explicit children snippet at the same time as implicit children content. Remove either the non-whitespace content or the children snippet block
```

### snippet\_invalid\_export[](https://svelte.dev/docs/svelte/compiler-errors#snippet_invalid_export)

```php-template
An exported snippet can only reference things declared in a `<script module>`, or other exportable snippets
```

It’s possible to export a snippet from a `<script module>` block, but only if it doesn’t reference anything defined inside a non-module-level `<script>`. For example you can’t do this...

```php-template
<script module>
export { greeting };
</script>

<script>
let message = 'hello';
</script>

{#snippet greeting(name)}
<p>{message} {name}!</p>
{/snippet}
```

...because `greeting` references `message`, which is defined in the second `<script>`.

### snippet\_invalid\_rest\_parameter[](https://svelte.dev/docs/svelte/compiler-errors#snippet_invalid_rest_parameter)

```css
Snippets do not support rest parameters; use an array instead
```

### snippet\_parameter\_assignment[](https://svelte.dev/docs/svelte/compiler-errors#snippet_parameter_assignment)

```bash
Cannot reassign or bind to snippet parameter
```

### snippet\_shadowing\_prop[](https://svelte.dev/docs/svelte/compiler-errors#snippet_shadowing_prop)

```csharp
This snippet is shadowing the prop `%prop%` with the same name
```

### state\_field\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#state_field_duplicate)

```csharp
`%name%` has already been declared on this class
```

An assignment to a class field that uses a `$state` or `$derived` rune is considered a _state field declaration_. The declaration can happen in the class body...

```perl
class Counter {
count = $state(0);
}
```

...or inside the constructor...

```perl
class Counter {
constructor() {
this.count = $state(0);
}
}
```

...but it can only happen once.

### state\_field\_invalid\_assignment[](https://svelte.dev/docs/svelte/compiler-errors#state_field_invalid_assignment)

```css
Cannot assign to a state field before its declaration
```

### state\_invalid\_export[](https://svelte.dev/docs/svelte/compiler-errors#state_invalid_export)

```javascript
Cannot export state from a module if it is reassigned. Either export a function returning the state value or only mutate the state value's properties
```

### state\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#state_invalid_placement)

```css
`%rune%(...)` can only be used as a variable declaration initializer, a class field declaration, or the first assignment to a class field at the top level of the constructor.
```

### store\_invalid\_scoped\_subscription[](https://svelte.dev/docs/svelte/compiler-errors#store_invalid_scoped_subscription)

```css
Cannot subscribe to stores that are not declared at the top level of the component
```

### store\_invalid\_subscription[](https://svelte.dev/docs/svelte/compiler-errors#store_invalid_subscription)

```php-template
Cannot reference store value inside `<script module>`
```

### store\_invalid\_subscription\_module[](https://svelte.dev/docs/svelte/compiler-errors#store_invalid_subscription_module)

```csharp
Cannot reference store value outside a `.svelte` file
```

Using a `$` prefix to refer to the value of a store is only possible inside `.svelte` files, where Svelte can automatically create subscriptions when a component is mounted and unsubscribe when the component is unmounted. Consider migrating to runes instead.

### style\_directive\_invalid\_modifier[](https://svelte.dev/docs/svelte/compiler-errors#style_directive_invalid_modifier)

```perl
`style:` directive can only use the `important` modifier
```

### style\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#style_duplicate)

```css
A component can have a single top-level `<style>` element
```

### svelte\_body\_illegal\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#svelte_body_illegal_attribute)

```r
`<svelte:body>` does not support non-event attributes or spread attributes
```

### svelte\_boundary\_invalid\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#svelte_boundary_invalid_attribute)

```r
Valid attributes on `<svelte:boundary>` are `onerror` and `failed`
```

### svelte\_boundary\_invalid\_attribute\_value[](https://svelte.dev/docs/svelte/compiler-errors#svelte_boundary_invalid_attribute_value)

```csharp
Attribute value must be a non-string expression
```

### svelte\_component\_invalid\_this[](https://svelte.dev/docs/svelte/compiler-errors#svelte_component_invalid_this)

```go
Invalid component definition — must be an `{expression}`
```

### svelte\_component\_missing\_this[](https://svelte.dev/docs/svelte/compiler-errors#svelte_component_missing_this)

```go
`<svelte:component>` must have a 'this' attribute
```

### svelte\_element\_missing\_this[](https://svelte.dev/docs/svelte/compiler-errors#svelte_element_missing_this)

```javascript
`<svelte:element>` must have a 'this' attribute with a value
```

### svelte\_fragment\_invalid\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#svelte_fragment_invalid_attribute)

```bash
`<svelte:fragment>` can only have a slot attribute and (optionally) a let: directive
```

### svelte\_fragment\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#svelte_fragment_invalid_placement)

```go
`<svelte:fragment>` must be the direct child of a component
```

### svelte\_head\_illegal\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#svelte_head_illegal_attribute)

```r
`<svelte:head>` cannot have attributes nor directives
```

### svelte\_meta\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#svelte_meta_duplicate)

```sql
A component can only have one `<%name%>` element
```

### svelte\_meta\_invalid\_content[](https://svelte.dev/docs/svelte/compiler-errors#svelte_meta_invalid_content)

```
<%name%> cannot have children
```

### svelte\_meta\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#svelte_meta_invalid_placement)

```go
`<%name%>` tags cannot be inside elements or blocks
```

### svelte\_meta\_invalid\_tag[](https://svelte.dev/docs/svelte/compiler-errors#svelte_meta_invalid_tag)

```r
Valid `<svelte:...>` tag names are %list%
```

### svelte\_options\_deprecated\_tag[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_deprecated_tag)

```vbnet
"tag" option is deprecated — use "customElement" instead
```

### svelte\_options\_invalid\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_invalid_attribute)

```javascript
`<svelte:options>` can only receive static attributes
```

### svelte\_options\_invalid\_attribute\_value[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_invalid_attribute_value)

```
Value must be %list%, if specified
```

### svelte\_options\_invalid\_customelement[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_invalid_customelement)

```css
"customElement" must be a string literal defining a valid custom element name or an object of the form { tag?: string; shadow?: "open" | "none"; props?: { [key: string]: { attribute?: string; reflect?: boolean; type: .. } } }
```

### svelte\_options\_invalid\_customelement\_props[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_invalid_customelement_props)

```python
"props" must be a statically analyzable object literal of the form "{ [key: string]: { attribute?: string; reflect?: boolean; type?: "String" | "Boolean" | "Number" | "Array" | "Object" }"
```

### svelte\_options\_invalid\_customelement\_shadow[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_invalid_customelement_shadow)

```python
"shadow" must be either "open" or "none"
```

### svelte\_options\_invalid\_tagname[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_invalid_tagname)

```scss
Tag name must be lowercase and hyphenated
```

See [https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) for more information on valid tag names

### svelte\_options\_reserved\_tagname[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_reserved_tagname)

See [https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) for more information on valid tag names

### svelte\_options\_unknown\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#svelte_options_unknown_attribute)

```typescript
`<svelte:options>` unknown attribute '%name%'
```

### svelte\_self\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#svelte_self_invalid_placement)

```go
`<svelte:self>` components can only exist inside `{#if}` blocks, `{#each}` blocks, `{#snippet}` blocks or slots passed to components
```

### tag\_invalid\_name[](https://svelte.dev/docs/svelte/compiler-errors#tag_invalid_name)

```css
Expected a valid element or component name. Components must have a valid variable name or dot notation expression
```

### tag\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-errors#tag_invalid_placement)

```
{@%name% ...} tag cannot be %location%
```

### textarea\_invalid\_content[](https://svelte.dev/docs/svelte/compiler-errors#textarea_invalid_content)

```css
A `<textarea>` can have either a value attribute or (equivalently) child content, but not both
```

### title\_illegal\_attribute[](https://svelte.dev/docs/svelte/compiler-errors#title_illegal_attribute)

```r
`<title>` cannot have attributes nor directives
```

### title\_invalid\_content[](https://svelte.dev/docs/svelte/compiler-errors#title_invalid_content)

```css
`<title>` can only contain text and {tags}
```

### transition\_conflict[](https://svelte.dev/docs/svelte/compiler-errors#transition_conflict)

```perl
Cannot use `%type%:` alongside existing `%existing%:` directive
```

### transition\_duplicate[](https://svelte.dev/docs/svelte/compiler-errors#transition_duplicate)

```graphql
Cannot use multiple `%type%:` directives on a single element
```

### typescript\_invalid\_feature[](https://svelte.dev/docs/svelte/compiler-errors#typescript_invalid_feature)

```css
TypeScript language features like %feature% are not natively supported, and their use is generally discouraged. Outside of `<script>` tags, these features are not supported. For use within `<script>` tags, you will need to use a preprocessor to convert it to JavaScript before it gets passed to the Svelte compiler. If you are using `vitePreprocess`, make sure to specifically enable preprocessing script tags (`vitePreprocess({ script: true })`)
```

### unexpected\_eof[](https://svelte.dev/docs/svelte/compiler-errors#unexpected_eof)

### unexpected\_reserved\_word[](https://svelte.dev/docs/svelte/compiler-errors#unexpected_reserved_word)

```vbnet
'%word%' is a reserved word in JavaScript and cannot be used here
```

### unterminated\_string\_constant[](https://svelte.dev/docs/svelte/compiler-errors#unterminated_string_constant)

```csharp
Unterminated string constant
```

### void\_element\_invalid\_content[](https://svelte.dev/docs/svelte/compiler-errors#void_element_invalid_content)

```kotlin
Void elements cannot have children or closing tags
```