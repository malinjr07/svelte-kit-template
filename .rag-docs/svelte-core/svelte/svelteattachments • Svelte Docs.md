```javascript
import { createAttachmentKey, fromAction } from 'svelte/attachments';
```

## createAttachmentKey[](https://svelte.dev/docs/svelte/svelte-attachments#createAttachmentKey)

> Available since 5.29

Creates an object key that will be recognised as an attachment when the object is spread onto an element, as a programmatic alternative to using `{@attach ...}`. This can be useful for library authors, though is generally not needed when building an app.

```php-template
<script>
import { createAttachmentKey } from 'svelte/attachments';

const props = {
class: 'cool',
onclick: () => alert('clicked'),
[createAttachmentKey()]: (node) => {
node.textContent = 'attached!';
}
};
</script>

<button {...props}>click me</button>
```

```cpp
function createAttachmentKey(): symbol;
```

## fromAction[](https://svelte.dev/docs/svelte/svelte-attachments#fromAction)

Converts an [action](https://svelte.dev/docs/svelte/use) into an [attachment](https://svelte.dev/docs/svelte/@attach) keeping the same behavior. It’s useful if you want to start using attachments on components but you have actions provided by a library.

Note that the second argument, if provided, must be a function that _returns_ the argument to the action function, not the argument itself.

```php-template
<!-- with an action -->
<div use:foo={bar}>...</div>

<!-- with an attachment -->
<div {@attach fromAction(foo, () => bar)}>...</div>
```

```typescript
function fromAction<
E extends EventTarget,
T extends unknown
>(
action:
| Action<E, T>
| ((element: E, arg: T) => void | ActionReturn<T>),
fn: () => T
): Attachment<E>;
```

```javascript
function fromAction<E extends EventTarget>(
action:
| Action<E, void>
| ((element: E) => void | ActionReturn<void>)
): Attachment<E>;
```

## Attachment[](https://svelte.dev/docs/svelte/svelte-attachments#Attachment)

An [attachment](https://svelte.dev/docs/svelte/@attach) is a function that runs when an element is mounted to the DOM, and optionally returns a function that is called when the element is later removed.

It can be attached to an element with an `{@attach ...}` tag, or by spreading an object containing a property created with [`createAttachmentKey`](https://svelte.dev/docs/svelte/svelte-attachments#createAttachmentKey).

```csharp
interface Attachment<T extends EventTarget = Element> {…}
```

```javascript
(element: T): void | (() => void);
```