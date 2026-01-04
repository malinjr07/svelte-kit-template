Svelte warns you at compile time if it catches potential mistakes, such as writing inaccessible markup.

Some warnings may be incorrect in your concrete use case. You can disable such false positives by placing a `<!-- svelte-ignore <code> -->` comment above the line that causes the warning. Example:

```php-template
<!-- svelte-ignore a11y_autofocus -->
<input autofocus />
```

You can list multiple rules in a single comment (separated by commas), and add an explanatory note (in parentheses) alongside them:

```php-template
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div onclick>...</div>
```

### a11y\_accesskey[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_accesskey)

Enforce no `accesskey` on element. Access keys are HTML attributes that allow web developers to assign keyboard shortcuts to elements. Inconsistencies between keyboard shortcuts and keyboard commands used by screen reader and keyboard-only users create accessibility complications. To avoid complications, access keys should not be used.

```php-template
<!-- A11y: Avoid using accesskey -->
<div accesskey="z"></div>
```

### a11y\_aria\_activedescendant\_has\_tabindex[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_aria_activedescendant_has_tabindex)

```csharp
An element with an aria-activedescendant attribute should have a tabindex value
```

An element with `aria-activedescendant` must be tabbable, so it must either have an inherent `tabindex` or declare `tabindex` as an attribute.

```php-template
<!-- A11y: Elements with attribute aria-activedescendant should have tabindex value -->
<div aria-activedescendant="some-id"></div>
```

### a11y\_aria\_attributes[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_aria_attributes)

```r
`<%name%>` should not have aria-* attributes
```

Certain reserved DOM elements do not support ARIA roles, states and properties. This is often because they are not visible, for example `meta`, `html`, `script`, `style`. This rule enforces that these DOM elements do not contain the `aria-*` props.

```php-template
<!-- A11y: <meta> should not have aria-* attributes -->
<meta aria-hidden="false" />
```

### a11y\_autocomplete\_valid[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_autocomplete_valid)

```python
'%value%' is an invalid value for 'autocomplete' on `<input type="%type%">`
```

### a11y\_autofocus[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_autofocus)

Enforce that `autofocus` is not used on elements. Autofocusing elements can cause usability issues for sighted and non-sighted users alike.

```php-template
<!-- A11y: Avoid using autofocus -->
<input autofocus />
```

### a11y\_click\_events\_have\_key\_events[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_click_events_have_key_events)

```csharp
Visible, non-interactive elements with a click event must be accompanied by a keyboard event handler. Consider whether an interactive element such as `<button type="button">` or `<a>` might be more appropriate
```

Enforce that visible, non-interactive elements with an `onclick` event are accompanied by a keyboard event handler.

Users should first consider whether an interactive element might be more appropriate such as a `<button type="button">` element for actions or `<a>` element for navigations. These elements are more semantically meaningful and will have built-in key handling. E.g. `Space` and `Enter` will trigger a `<button>` and `Enter` will trigger an `<a>` element.

If a non-interactive element is required then `onclick` should be accompanied by an `onkeyup` or `onkeydown` handler that enables the user to perform equivalent actions via the keyboard. In order for the user to be able to trigger a key press, the element will also need to be focusable by adding a [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex). While an `onkeypress` handler will also silence this warning, it should be noted that the `keypress` event is deprecated.

```php-template
<!-- A11y: visible, non-interactive elements with an onclick event must be accompanied by a keyboard event handler. -->
<div onclick={() => {}}></div>
```

Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

### a11y\_consider\_explicit\_label[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_consider_explicit_label)

```css
Buttons and links should either contain text or have an `aria-label`, `aria-labelledby` or `title` attribute
```

### a11y\_distracting\_elements[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_distracting_elements)

```go
Avoid `<%name%>` elements
```

Enforces that no distracting elements are used. Elements that can be visually distracting can cause accessibility issues with visually impaired users. Such elements are most likely deprecated, and should be avoided.

The following elements are visually distracting: `<marquee>` and `<blink>`.

```php-template
<!-- A11y: Avoid <marquee> elements -->
<marquee></marquee>
```

### a11y\_figcaption\_index[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_figcaption_index)

```perl
`<figcaption>` must be first or last child of `<figure>`
```

### a11y\_figcaption\_parent[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_figcaption_parent)

```css
`<figcaption>` must be an immediate child of `<figure>`
```

Enforce that certain DOM elements have the correct structure.

```php-template
<!-- A11y: <figcaption> must be an immediate child of <figure> -->
<div>
<figcaption>Image caption</figcaption>
</div>
```

### a11y\_hidden[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_hidden)

```go
`<%name%>` element should not be hidden
```

Certain DOM elements are useful for screen reader navigation and should not be hidden.

```php-template
<!-- A11y: <h2> element should not be hidden -->
<h2 aria-hidden="true">invisible header</h2>
```

### a11y\_img\_redundant\_alt[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_img_redundant_alt)

```css
Screenreaders already announce `<img>` elements as an image
```

Enforce img alt attribute does not contain the word image, picture, or photo. Screen readers already announce `img` elements as an image. There is no need to use words such as _image_, _photo_, and/or _picture_.

```php-template
<img src="foo" alt="Foo eating a sandwich." />

<!-- aria-hidden, won't be announced by screen reader -->
<img src="bar" aria-hidden="true" alt="Picture of me taking a photo of an image" />

<!-- A11y: Screen readers already announce <img> elements as an image. -->
<img src="foo" alt="Photo of foo being weird." />

<!-- A11y: Screen readers already announce <img> elements as an image. -->
<img src="bar" alt="Image of me at a bar!" />

<!-- A11y: Screen readers already announce <img> elements as an image. -->
<img src="foo" alt="Picture of baz fixing a bug." />
```

### a11y\_incorrect\_aria\_attribute\_type[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_incorrect_aria_attribute_type)

```bash
The value of '%attribute%' must be a %type%
```

Enforce that only the correct type of value is used for aria attributes. For example, `aria-hidden` should only receive a boolean.

```php-template
<!-- A11y: The value of 'aria-hidden' must be exactly one of true or false -->
<div aria-hidden="yes"></div>
```

### a11y\_incorrect\_aria\_attribute\_type\_boolean[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_incorrect_aria_attribute_type_boolean)

```php
The value of '%attribute%' must be either 'true' or 'false'. It cannot be empty
```

### a11y\_incorrect\_aria\_attribute\_type\_id[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_incorrect_aria_attribute_type_id)

```vbnet
The value of '%attribute%' must be a string that represents a DOM element ID
```

### a11y\_incorrect\_aria\_attribute\_type\_idlist[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_incorrect_aria_attribute_type_idlist)

```vbnet
The value of '%attribute%' must be a space-separated list of strings that represent DOM element IDs
```

### a11y\_incorrect\_aria\_attribute\_type\_integer[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_incorrect_aria_attribute_type_integer)

```bash
The value of '%attribute%' must be an integer
```

### a11y\_incorrect\_aria\_attribute\_type\_token[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_incorrect_aria_attribute_type_token)

```sql
The value of '%attribute%' must be exactly one of %values%
```

### a11y\_incorrect\_aria\_attribute\_type\_tokenlist[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_incorrect_aria_attribute_type_tokenlist)

```sql
The value of '%attribute%' must be a space-separated list of one or more of %values%
```

### a11y\_incorrect\_aria\_attribute\_type\_tristate[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_incorrect_aria_attribute_type_tristate)

```php
The value of '%attribute%' must be exactly one of true, false, or mixed
```

### a11y\_interactive\_supports\_focus[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_interactive_supports_focus)

```vbnet
Elements with the '%role%' interactive role must have a tabindex value
```

Enforce that elements with an interactive role and interactive handlers (mouse or key press) must be focusable or tabbable.

```php-template
<!-- A11y: Elements with the 'button' interactive role must have a tabindex value. -->
<div role="button" onkeypress={() => {}} />
```

### a11y\_invalid\_attribute[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_invalid_attribute)

```csharp
'%href_value%' is not a valid %href_attribute% attribute
```

Enforce that attributes important for accessibility have a valid value. For example, `href` should not be empty, `'#'`, or `javascript:`.

```php-template
<!-- A11y: '' is not a valid href attribute -->
<a href="">invalid</a>
```

### a11y\_label\_has\_associated\_control[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_label_has_associated_control)

```css
A form label must be associated with a control
```

Enforce that a label tag has a text label and an associated control.

There are two supported ways to associate a label with a control:

-   Wrapping a control in a label tag.
-   Adding `for` to a label and assigning it the ID of an input on the page.

```php-template
<label for="id">B</label>

<label>C <input type="text" /></label>

<!-- A11y: A form label must be associated with a control. -->
<label>A</label>
```

### a11y\_media\_has\_caption[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_media_has_caption)

```php-template
`<video>` elements must have a `<track kind="captions">`
```

Providing captions for media is essential for deaf users to follow along. Captions should be a transcription or translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information. Not only is this important for accessibility, but can also be useful for all users in the case that the media is unavailable (similar to `alt` text on an image when an image is unable to load).

The captions should contain all important and relevant information to understand the corresponding media. This may mean that the captions are not a 1:1 mapping of the dialogue in the media content. However, captions are not necessary for video components with the `muted` attribute.

```php-template
<video><track kind="captions" /></video>

<audio muted></audio>

<!-- A11y: Media elements must have a <track kind=\"captions\"> -->
<video></video>

<!-- A11y: Media elements must have a <track kind=\"captions\"> -->
<video><track /></video>
```

### a11y\_misplaced\_role[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_misplaced_role)

```go
`<%name%>` should not have role attribute
```

Certain reserved DOM elements do not support ARIA roles, states and properties. This is often because they are not visible, for example `meta`, `html`, `script`, `style`. This rule enforces that these DOM elements do not contain the `role` props.

```php-template
<!-- A11y: <meta> should not have role attribute -->
<meta role="tooltip" />
```

### a11y\_misplaced\_scope[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_misplaced_scope)

```sql
The scope attribute should only be used with `<th>` elements
```

The scope attribute should only be used on `<th>` elements.

```php-template
<!-- A11y: The scope attribute should only be used with <th> elements -->
<div scope="row" />
```

### a11y\_missing\_attribute[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_missing_attribute)

```css
`<%name%>` element should have %article% %sequence% attribute
```

Enforce that attributes required for accessibility are present on an element. This includes the following checks:

-   `<a>` should have an href (unless it’s a [fragment-defining tag](https://github.com/sveltejs/svelte/issues/4697))
-   `<area>` should have alt, aria-label, or aria-labelledby
-   `<html>` should have lang
-   `<iframe>` should have title
-   `<img>` should have alt
-   `<object>` should have title, aria-label, or aria-labelledby
-   `<input type="image">` should have alt, aria-label, or aria-labelledby

```php-template
<!-- A11y: <input type=\"image\"> element should have an alt, aria-label or aria-labelledby attribute -->
<input type="image" />

<!-- A11y: <html> element should have a lang attribute -->
<html></html>

<!-- A11y: <a> element should have an href attribute -->
<a>text</a>
```

### a11y\_missing\_content[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_missing_content)

```css
`<%name%>` element should contain text
```

Enforce that heading elements (`h1`, `h2`, etc.) and anchors have content and that the content is accessible to screen readers

```php-template
<!-- A11y: <a> element should have child content -->
<a href="/foo"></a>

<!-- A11y: <h1> element should have child content -->
<h1></h1>
```

### a11y\_mouse\_events\_have\_key\_events[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_mouse_events_have_key_events)

```csharp
'%event%' event must be accompanied by '%accompanied_by%' event
```

Enforce that `onmouseover` and `onmouseout` are accompanied by `onfocus` and `onblur`, respectively. This helps to ensure that any functionality triggered by these mouse events is also accessible to keyboard users.

```php-template
<!-- A11y: onmouseover must be accompanied by onfocus -->
<div onmouseover={handleMouseover} />

<!-- A11y: onmouseout must be accompanied by onblur -->
<div onmouseout={handleMouseout} />
```

### a11y\_no\_abstract\_role[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_no_abstract_role)

```csharp
Abstract role '%role%' is forbidden
```

### a11y\_no\_interactive\_element\_to\_noninteractive\_role[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_no_interactive_element_to_noninteractive_role)

```go
`<%element%>` cannot have role '%role%'
```

[WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) roles should not be used to convert an interactive element to a non-interactive element. Non-interactive ARIA roles include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

```php-template
<!-- A11y: <textarea> cannot have role 'listitem' -->
<textarea role="listitem"></textarea>
```

### a11y\_no\_noninteractive\_element\_interactions[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_no_noninteractive_element_interactions)

```r
Non-interactive element `<%element%>` should not be assigned mouse or keyboard event listeners
```

A non-interactive element does not support event handlers (mouse and key handlers). Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<p>`, `<img>`, `<li>`, `<ul>` and `<ol>`. Non-interactive [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

```php-template
<!-- `A11y: Non-interactive element <li> should not be assigned mouse or keyboard event listeners.` -->
<li onclick={() => {}}></li>

<!-- `A11y: Non-interactive element <div> should not be assigned mouse or keyboard event listeners.` -->
<div role="listitem" onclick={() => {}}></div>
```

### a11y\_no\_noninteractive\_element\_to\_interactive\_role[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_no_noninteractive_element_to_interactive_role)

```r
Non-interactive element `<%element%>` cannot have interactive role '%role%'
```

[WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) roles should not be used to convert a non-interactive element to an interactive element. Interactive ARIA roles include `button`, `link`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `searchbox`, `switch` and `textbox`.

```php-template
<!-- A11y: Non-interactive element <h3> cannot have interactive role 'searchbox' -->
<h3 role="searchbox">Button</h3>
```

### a11y\_no\_noninteractive\_tabindex[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_no_noninteractive_tabindex)

```
noninteractive element cannot have nonnegative tabIndex value
```

Tab key navigation should be limited to elements on the page that can be interacted with.

```php-template
<!-- A11y: noninteractive element cannot have nonnegative tabIndex value -->
<div tabindex="0"></div>
```

### a11y\_no\_redundant\_roles[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_no_redundant_roles)

Some HTML elements have default ARIA roles. Giving these elements an ARIA role that is already set by the browser [has no effect](https://www.w3.org/TR/using-aria/#aria-does-nothing) and is redundant.

```php-template
<!-- A11y: Redundant role 'button' -->
<button role="button">...</button>

<!-- A11y: Redundant role 'img' -->
<img role="img" src="foo.jpg" />
```

### a11y\_no\_static\_element\_interactions[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_no_static_element_interactions)

```javascript
`<%element%>` with a %handler% handler must have an ARIA role
```

Elements like `<div>` with interactive handlers like `click` must have an ARIA role.

```php-template
<!-- A11y: <div> with click handler must have an ARIA role -->
<div onclick={() => ''}></div>
```

### a11y\_positive\_tabindex[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_positive_tabindex)

```perl
Avoid tabindex values above zero
```

Avoid positive `tabindex` property values. This will move elements out of the expected tab order, creating a confusing experience for keyboard users.

```php-template
<!-- A11y: avoid tabindex values above zero -->
<div tabindex="1"></div>
```

### a11y\_role\_has\_required\_aria\_props[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_role_has_required_aria_props)

```csharp
Elements with the ARIA role "%role%" must have the following attributes defined: %props%
```

Elements with ARIA roles must have all required attributes for that role.

```php-template
<!-- A11y: A11y: Elements with the ARIA role "checkbox" must have the following attributes defined: "aria-checked" -->
<span role="checkbox" aria-labelledby="foo" tabindex="0"></span>
```

### a11y\_role\_supports\_aria\_props[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_role_supports_aria_props)

```csharp
The attribute '%attribute%' is not supported by the role '%role%'
```

Elements with explicit or implicit roles defined contain only `aria-*` properties supported by that role.

```php-template
<!-- A11y: The attribute 'aria-multiline' is not supported by the role 'link'. -->
<div role="link" aria-multiline></div>

<!-- A11y: The attribute 'aria-required' is not supported by the role 'listitem'. This role is implicit on the element <li>. -->
<li aria-required></li>
```

### a11y\_role\_supports\_aria\_props\_implicit[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_role_supports_aria_props_implicit)

```csharp
The attribute '%attribute%' is not supported by the role '%role%'. This role is implicit on the element `<%name%>`
```

Elements with explicit or implicit roles defined contain only `aria-*` properties supported by that role.

```php-template
<!-- A11y: The attribute 'aria-multiline' is not supported by the role 'link'. -->
<div role="link" aria-multiline></div>

<!-- A11y: The attribute 'aria-required' is not supported by the role 'listitem'. This role is implicit on the element <li>. -->
<li aria-required></li>
```

### a11y\_unknown\_aria\_attribute[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_unknown_aria_attribute)

```sql
Unknown aria attribute 'aria-%attribute%'
```

```sql
Unknown aria attribute 'aria-%attribute%'. Did you mean '%suggestion%'?
```

Enforce that only known ARIA attributes are used. This is based on the [WAI-ARIA States and Properties spec](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties).

```php-template
<!-- A11y: Unknown aria attribute 'aria-labeledby' (did you mean 'labelledby'?) -->
<input type="image" aria-labeledby="foo" />
```

### a11y\_unknown\_role[](https://svelte.dev/docs/svelte/compiler-warnings#a11y_unknown_role)

```sql
Unknown role '%role%'. Did you mean '%suggestion%'?
```

Elements with ARIA roles must use a valid, non-abstract ARIA role. A reference to role definitions can be found at [WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions) site.

```php-template
<!-- A11y: Unknown role 'toooltip' (did you mean 'tooltip'?) -->
<div role="toooltip"></div>
```

### attribute\_avoid\_is[](https://svelte.dev/docs/svelte/compiler-warnings#attribute_avoid_is)

```csharp
The "is" attribute is not supported cross-browser and should be avoided
```

### attribute\_global\_event\_reference[](https://svelte.dev/docs/svelte/compiler-warnings#attribute_global_event_reference)

```sql
You are referencing `globalThis.%name%`. Did you forget to declare a variable with that name?
```

### attribute\_illegal\_colon[](https://svelte.dev/docs/svelte/compiler-warnings#attribute_illegal_colon)

```csharp
Attributes should not contain ':' characters to prevent ambiguity with Svelte directives
```

### attribute\_invalid\_property\_name[](https://svelte.dev/docs/svelte/compiler-warnings#attribute_invalid_property_name)

```csharp
'%wrong%' is not a valid HTML attribute. Did you mean '%right%'?
```

### attribute\_quoted[](https://svelte.dev/docs/svelte/compiler-warnings#attribute_quoted)

```vbnet
Quoted attributes on components and custom elements will be stringified in a future version of Svelte. If this isn't what you want, remove the quotes
```

### bidirectional\_control\_characters[](https://svelte.dev/docs/svelte/compiler-warnings#bidirectional_control_characters)

```css
A bidirectional control character was detected in your code. These characters can be used to alter the visual direction of your code and could have unintended consequences
```

Bidirectional control characters can alter the direction in which text appears to be in. For example, via control characters, you can make `defabc` look like `abcdef`. As a result, if you were to unknowingly copy and paste some code that has these control characters, they may alter the behavior of your code in ways you did not intend. See [trojansource.codes](https://trojansource.codes/) for more information.

### bind\_invalid\_each\_rest[](https://svelte.dev/docs/svelte/compiler-warnings#bind_invalid_each_rest)

```typescript
The rest operator (...) will create a new object and binding '%name%' with the original object will not work
```

### block\_empty[](https://svelte.dev/docs/svelte/compiler-warnings#block_empty)

### component\_name\_lowercase[](https://svelte.dev/docs/svelte/compiler-warnings#component_name_lowercase)

```javascript
`<%name%>` will be treated as an HTML element unless it begins with a capital letter
```

### css\_unused\_selector[](https://svelte.dev/docs/svelte/compiler-warnings#css_unused_selector)

```bash
Unused CSS selector "%name%"
```

Svelte traverses both the template and the `<style>` tag to find out which of the CSS selectors are not used within the template, so it can remove them.

In some situations a selector may target an element that is not ‘visible’ to the compiler, for example because it is part of an `{@html ...}` tag or you’re overriding styles in a child component. In these cases, use [`:global`](https://svelte.dev/docs/svelte/global-styles) to preserve the selector as-is:

```perl
<div class="post">{@html content}</div>

<style>
  .post :global {
p {...}
  }
</style>
```

### custom\_element\_props\_identifier[](https://svelte.dev/docs/svelte/compiler-warnings#custom_element_props_identifier)

```vbnet
Using a rest element or a non-destructured declaration with `$props()` means that Svelte can't infer what properties to expose when creating a custom element. Consider destructuring all the props or explicitly specifying the `customElement.props` option.
```

### element\_implicitly\_closed[](https://svelte.dev/docs/svelte/compiler-warnings#element_implicitly_closed)

```vbnet
This element is implicitly closed by the following `%tag%`, which can cause an unexpected DOM structure. Add an explicit `%closing%` to avoid surprises.
```

In HTML, some elements are implicitly closed by another element. For example, you cannot nest a `<p>` inside another `<p>`:

```php-template
<!-- this HTML... -->
<p><p>hello</p>

<!-- results in this DOM structure -->
<p></p>
<p>hello</p>
```

Similarly, a parent element’s closing tag will implicitly close all child elements, even if the `</` was a typo and you meant to create a _new_ element. To avoid ambiguity, it’s always a good idea to have an explicit closing tag.

### element\_invalid\_self\_closing\_tag[](https://svelte.dev/docs/svelte/compiler-warnings#element_invalid_self_closing_tag)

```javascript
Self-closing HTML tags for non-void elements are ambiguous — use `<%name% ...></%name%>` rather than `<%name% ... />`
```

In HTML, there’s [no such thing as a self-closing tag](https://jakearchibald.com/2023/against-self-closing-tags-in-html/). While this _looks_ like a self-contained element with some text next to it...

```php-template
<div>
<span class="icon" /> some text!
</div>
```

...a spec-compliant HTML parser (such as a browser) will in fact parse it like this, with the text _inside_ the icon:

```php-template
<div>
<span class="icon"> some text! </span>
</div>
```

Some templating languages (including Svelte) will ‘fix’ HTML by turning `<span />` into `<span></span>`. Others adhere to the spec. Both result in ambiguity and confusion when copy-pasting code between different contexts, so Svelte prompts you to resolve the ambiguity directly by having an explicit closing tag.

To automate this, run the dedicated migration:

```lua
npx sv migrate self-closing-tags
```

In a future version of Svelte, self-closing tags may be upgraded from a warning to an error.

### event\_directive\_deprecated[](https://svelte.dev/docs/svelte/compiler-warnings#event_directive_deprecated)

```vbnet
Using `on:%name%` to listen to the %name% event is deprecated. Use the event attribute `on%name%` instead
```

See [the migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes) for more info.

### export\_let\_unused[](https://svelte.dev/docs/svelte/compiler-warnings#export_let_unused)

```csharp
Component has unused export property '%name%'. If it is for external reference only, please consider using `export const %name%`
```

### legacy\_code[](https://svelte.dev/docs/svelte/compiler-warnings#legacy_code)

```perl
`%code%` is no longer valid — please use `%suggestion%` instead
```

### legacy\_component\_creation[](https://svelte.dev/docs/svelte/compiler-warnings#legacy_component_creation)

```javascript
Svelte 5 components are no longer classes. Instantiate them using `mount` or `hydrate` (imported from 'svelte') instead.
```

See the [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

### node\_invalid\_placement\_ssr[](https://svelte.dev/docs/svelte/compiler-warnings#node_invalid_placement_ssr)

```csharp
%message%. When rendering this component on the server, the resulting HTML will be modified by the browser (by moving, removing, or inserting elements), likely resulting in a `hydration_mismatch` warning
```

HTML restricts where certain elements can appear. In case of a violation the browser will ‘repair’ the HTML in a way that breaks Svelte’s assumptions about the structure of your components. Some examples:

-   `<p>hello <div>world</div></p>` will result in `<p>hello </p><div>world</div><p></p>` (the `<div>` autoclosed the `<p>` because `<p>` cannot contain block-level elements)
-   `<option><div>option a</div></option>` will result in `<option>option a</option>` (the `<div>` is removed)
-   `<table><tr><td>cell</td></tr></table>` will result in `<table><tbody><tr><td>cell</td></tr></tbody></table>` (a `<tbody>` is auto-inserted)

This code will work when the component is rendered on the client (which is why this is a warning rather than an error), but if you use server rendering it will cause hydration to fail.

### non\_reactive\_update[](https://svelte.dev/docs/svelte/compiler-warnings#non_reactive_update)

```csharp
`%name%` is updated, but is not declared with `$state(...)`. Changing its value will not correctly trigger updates
```

This warning is thrown when the compiler detects the following:

-   a variable was declared without `$state` or `$state.raw`
-   the variable is reassigned
-   the variable is read in a reactive context

In this case, changing the value will not correctly trigger updates. Example:

```php-template
<script>
let reactive = $state('reactive');
let stale = 'stale';
</script>

<p>This value updates: {reactive}</p>
<p>This value does not update: {stale}</p>

<button onclick={() => {
stale = 'updated';
reactive = 'updated';
}}>update</button>
```

To fix this, wrap your variable declaration with `$state`.

### options\_deprecated\_accessors[](https://svelte.dev/docs/svelte/compiler-warnings#options_deprecated_accessors)

```perl
The `accessors` option has been deprecated. It will have no effect in runes mode
```

### options\_deprecated\_immutable[](https://svelte.dev/docs/svelte/compiler-warnings#options_deprecated_immutable)

```perl
The `immutable` option has been deprecated. It will have no effect in runes mode
```

### options\_missing\_custom\_element[](https://svelte.dev/docs/svelte/compiler-warnings#options_missing_custom_element)

```vbnet
The `customElement` option is used when generating a custom element. Did you forget the `customElement: true` compile option?
```

### options\_removed\_enable\_sourcemap[](https://svelte.dev/docs/svelte/compiler-warnings#options_removed_enable_sourcemap)

```css
The `enableSourcemap` option has been removed. Source maps are always generated now, and tooling can choose to ignore them
```

### options\_removed\_hydratable[](https://svelte.dev/docs/svelte/compiler-warnings#options_removed_hydratable)

```css
The `hydratable` option has been removed. Svelte components are always hydratable now
```

### options\_removed\_loop\_guard\_timeout[](https://svelte.dev/docs/svelte/compiler-warnings#options_removed_loop_guard_timeout)

```css
The `loopGuardTimeout` option has been removed
```

### options\_renamed\_ssr\_dom[](https://svelte.dev/docs/svelte/compiler-warnings#options_renamed_ssr_dom)

```vbnet
`generate: "dom"` and `generate: "ssr"` options have been renamed to "client" and "server" respectively
```

### perf\_avoid\_inline\_class[](https://svelte.dev/docs/svelte/compiler-warnings#perf_avoid_inline_class)

```kotlin
Avoid 'new class' — instead, declare the class at the top level scope
```

### perf\_avoid\_nested\_class[](https://svelte.dev/docs/svelte/compiler-warnings#perf_avoid_nested_class)

```scss
Avoid declaring classes below the top level scope
```

### reactive\_declaration\_invalid\_placement[](https://svelte.dev/docs/svelte/compiler-warnings#reactive_declaration_invalid_placement)

```css
Reactive declarations only exist at the top level of the instance script
```

### reactive\_declaration\_module\_script\_dependency[](https://svelte.dev/docs/svelte/compiler-warnings#reactive_declaration_module_script_dependency)

```sql
Reassignments of module-level declarations will not cause reactive statements to update
```

### script\_context\_deprecated[](https://svelte.dev/docs/svelte/compiler-warnings#script_context_deprecated)

```perl
`context="module"` is deprecated, use the `module` attribute instead
```

```php-template
<script context="module" module>
let foo = 'bar';
</script>
```

### script\_unknown\_attribute[](https://svelte.dev/docs/svelte/compiler-warnings#script_unknown_attribute)

```javascript
Unrecognized attribute — should be one of `generics`, `lang` or `module`. If this exists for a preprocessor, ensure that the preprocessor removes it
```

### slot\_element\_deprecated[](https://svelte.dev/docs/svelte/compiler-warnings#slot_element_deprecated)

```css
Using `<slot>` to render parent content is deprecated. Use `{@render ...}` tags instead
```

See [the migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Snippets-instead-of-slots) for more info.

### state\_referenced\_locally[](https://svelte.dev/docs/svelte/compiler-warnings#state_referenced_locally)

```css
This reference only captures the initial value of `%name%`. Did you mean to reference it inside a %type% instead?
```

This warning is thrown when the compiler detects the following:

-   A reactive variable is declared
-   ...and later reassigned...
-   ...and referenced in the same scope

This ‘breaks the link’ to the original state declaration. For example, if you pass the state to a function, the function loses access to the state once it is reassigned:

To fix this, reference the variable such that it is lazily evaluated. For the above example, this can be achieved by wrapping `count` in a function:

For more info, see [Passing state into functions](https://svelte.dev/docs/svelte/$state#Passing-state-into-functions).

### store\_rune\_conflict[](https://svelte.dev/docs/svelte/compiler-warnings#store_rune_conflict)

```vbnet
It looks like you're using the `$%name%` rune, but there is a local binding called `%name%`. Referencing a local variable with a `$` prefix will create a store subscription. Please rename `%name%` to avoid the ambiguity
```

### svelte\_component\_deprecated[](https://svelte.dev/docs/svelte/compiler-warnings#svelte_component_deprecated)

```csharp
`<svelte:component>` is deprecated in runes mode — components are dynamic by default
```

In previous versions of Svelte, the component constructor was fixed when the component was rendered. In other words, if you wanted `<X>` to re-render when `X` changed, you would either have to use `<svelte:component this={X}>` or put the component inside a `{#key X}...{/key}` block.

In Svelte 5 this is no longer true — if `X` changes, `<X>` re-renders.

In some cases `<object.property>` syntax can be used as a replacement; a lowercased variable with property access is recognized as a component in Svelte 5.

For complex component resolution logic, an intermediary, capitalized variable may be necessary. E.g. in places where `@const` can be used:

```css
{#each items as item}
<svelte:component this={item.condition ? Y : Z} />
{@const Component = item.condition ? Y : Z}
<Component />
{/each}
```

A derived value may be used in other contexts:

```php-template
<script>
// ...
let condition = $state(false);
const Component = $derived(condition ? Y : Z);
</script>

<svelte:component this={condition ? Y : Z} />
<Component />
```

### svelte\_element\_invalid\_this[](https://svelte.dev/docs/svelte/compiler-warnings#svelte_element_invalid_this)

```go
`this` should be an `{expression}`. Using a string attribute value will cause an error in future versions of Svelte
```

### svelte\_self\_deprecated[](https://svelte.dev/docs/svelte/compiler-warnings#svelte_self_deprecated)

```python
`<svelte:self>` is deprecated — use self-imports (e.g. `import %name% from './%basename%'`) instead
```

See [the note in the docs](https://svelte.dev/docs/svelte/legacy-svelte-self) for more info.

### unknown\_code[](https://svelte.dev/docs/svelte/compiler-warnings#unknown_code)

```css
`%code%` is not a recognised code
```

```less
`%code%` is not a recognised code (did you mean `%suggestion%`?)
```