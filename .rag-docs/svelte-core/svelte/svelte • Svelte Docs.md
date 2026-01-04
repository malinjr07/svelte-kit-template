```javascript
import {
SvelteComponent,
SvelteComponentTyped,
afterUpdate,
beforeUpdate,
createContext,
createEventDispatcher,
createRawSnippet,
flushSync,
fork,
getAbortSignal,
getAllContexts,
getContext,
hasContext,
hydratable,
hydrate,
mount,
onDestroy,
onMount,
setContext,
settled,
tick,
unmount,
untrack
} from 'svelte';
```

## SvelteComponent[](https://svelte.dev/docs/svelte/svelte#SvelteComponent)

This was the base class for Svelte components in Svelte 4. Svelte 5+ components are completely different under the hood. For typing, use `Component` instead. To instantiate components, use `mount` instead. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

```typescript
class SvelteComponent<
Props extends Record<string, any> = Record<string, any>,
Events extends Record<string, any> = any,
Slots extends Record<string, any> = any
> {…}
```

```csharp
static element?: typeof HTMLElement;
```

The custom element version of the component. Only present if compiled with the `customElement` compiler option

```javascript
constructor(options: ComponentConstructorOptions<Properties<Props, Slots>>);
```

-   deprecated This constructor only exists when using the `asClassComponent` compatibility helper, which is a stop-gap solution. Migrate towards using `mount` instead. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

-   deprecated This method only exists when using one of the legacy compatibility helpers, which is a stop-gap solution. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

```typescript
$on<K extends Extract<keyof Events, string>>(
type: K,
callback: (e: Events[K]) => void
): () => void;
```

-   deprecated This method only exists when using one of the legacy compatibility helpers, which is a stop-gap solution. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

```csharp
$set(props: Partial<Props>): void;
```

-   deprecated This method only exists when using one of the legacy compatibility helpers, which is a stop-gap solution. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

## SvelteComponentTyped[](https://svelte.dev/docs/svelte/svelte#SvelteComponentTyped)

> Use `Component` instead. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more information.

```typescript
class SvelteComponentTyped<
Props extends Record<string, any> = Record<string, any>,
Events extends Record<string, any> = any,
Slots extends Record<string, any> = any
> extends SvelteComponent<Props, Events, Slots> {}
```

## afterUpdate[](https://svelte.dev/docs/svelte/svelte#afterUpdate)

> Use [`$effect`](https://svelte.dev/docs/svelte/$effect) instead

Schedules a callback to run immediately after the component has been updated.

The first time the callback runs will be after the initial `onMount`.

In runes mode use `$effect` instead.

```javascript
function afterUpdate(fn: () => void): void;
```

## beforeUpdate[](https://svelte.dev/docs/svelte/svelte#beforeUpdate)

> Use [`$effect.pre`](https://svelte.dev/docs/svelte/$effect#$effect.pre) instead

Schedules a callback to run immediately before the component is updated after any state change.

The first time the callback runs will be before the initial `onMount`.

In runes mode use `$effect.pre` instead.

```javascript
function beforeUpdate(fn: () => void): void;
```

## createContext[](https://svelte.dev/docs/svelte/svelte#createContext)

> Available since 5.40.0

Returns a `[get, set]` pair of functions for working with context in a type-safe way.

`get` will throw an error if no parent component called `set`.

```r
function createContext<T>(): [() => T, (context: T) => T];
```

## createEventDispatcher[](https://svelte.dev/docs/svelte/svelte#createEventDispatcher)

> Use callback props and/or the `$host()` rune instead — see [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Component-events)

Creates an event dispatcher that can be used to dispatch [component events](https://svelte.dev/docs/svelte/legacy-on#Component-events). Event dispatchers are functions that can take two arguments: `name` and `detail`.

Component events created with `createEventDispatcher` create a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture). The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property and can contain any type of data.

The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:

```typescript
const dispatch = createEventDispatcher<{
 loaded: null; // does not take a detail argument
 change: string; // takes a detail argument of type string, which is required
 optional: number | null; // takes an optional detail argument of type number
}>();
```

```typescript
function createEventDispatcher<
EventMap extends Record<string, any> = any
>(): EventDispatcher<EventMap>;
```

## createRawSnippet[](https://svelte.dev/docs/svelte/svelte#createRawSnippet)

Create a snippet programmatically

```typescript
function createRawSnippet<Params extends unknown[]>(
fn: (...params: Getters<Params>) => {
render: () => string;
setup?: (element: Element) => void | (() => void);
}
): Snippet<Params>;
```

## flushSync[](https://svelte.dev/docs/svelte/svelte#flushSync)

Synchronously flush any pending updates. Returns void if no callback is provided, otherwise returns the result of calling the callback.

```javascript
function flushSync<T = void>(fn?: (() => T) | undefined): T;
```

## fork[](https://svelte.dev/docs/svelte/svelte#fork)

> Available since 5.42

Creates a ‘fork’, in which state changes are evaluated but not applied to the DOM. This is useful for speculatively loading data (for example) when you suspect that the user is about to take some action.

Frameworks like SvelteKit can use this to preload data when the user touches or hovers over a link, making any subsequent navigation feel instantaneous.

The `fn` parameter is a synchronous function that modifies some state. The state changes will be reverted after the fork is initialised, then reapplied if and when the fork is eventually committed.

When it becomes clear that a fork will _not_ be committed (e.g. because the user navigated elsewhere), it must be discarded to avoid leaking memory.

```javascript
function fork(fn: () => void): Fork;
```

## getAbortSignal[](https://svelte.dev/docs/svelte/svelte#getAbortSignal)

Returns an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that aborts when the current [derived](https://svelte.dev/docs/svelte/$derived) or [effect](https://svelte.dev/docs/svelte/$effect) re-runs or is destroyed.

Must be called while a derived or effect is running.

```php-template
<script>
import { getAbortSignal } from 'svelte';

let { id } = $props();

async function getData(id) {
const response = await fetch(`/items/${id}`, {
signal: getAbortSignal()
});

return await response.json();
}

const data = $derived(await getData(id));
</script>
```

```cpp
function getAbortSignal(): AbortSignal;
```

## getAllContexts[](https://svelte.dev/docs/svelte/svelte#getAllContexts)

Retrieves the whole context map that belongs to the closest parent component. Must be called during component initialisation. Useful, for example, if you programmatically create a component and want to pass the existing context to it.

```typescript
function getAllContexts<
T extends Map<any, any> = Map<any, any>
>(): T;
```

## getContext[](https://svelte.dev/docs/svelte/svelte#getContext)

Retrieves the context that belongs to the closest parent component with the specified `key`. Must be called during component initialisation.

[`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.

```r
function getContext<T>(key: any): T;
```

## hasContext[](https://svelte.dev/docs/svelte/svelte#hasContext)

Checks whether a given `key` has been set in the context of a parent component. Must be called during component initialisation.

```cpp
function hasContext(key: any): boolean;
```

## hydratable[](https://svelte.dev/docs/svelte/svelte#hydratable)

```php
function hydratable<T>(key: string, fn: () => T): T;
```

## hydrate[](https://svelte.dev/docs/svelte/svelte#hydrate)

Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component

```typescript
function hydrate<
Props extends Record<string, any>,
Exports extends Record<string, any>
>(
component:
| ComponentType<SvelteComponent<Props>>
| Component<Props, Exports, any>,
options: {} extends Props
? {
target: Document | Element | ShadowRoot;
props?: Props;
events?: Record<string, (e: any) => any>;
context?: Map<any, any>;
intro?: boolean;
recover?: boolean;
}
: {
target: Document | Element | ShadowRoot;
props: Props;
events?: Record<string, (e: any) => any>;
context?: Map<any, any>;
intro?: boolean;
recover?: boolean;
}
): Exports;
```

## mount[](https://svelte.dev/docs/svelte/svelte#mount)

Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component. Transitions will play during the initial render unless the `intro` option is set to `false`.

```swift
function mount<
Props extends Record<string, any>,
Exports extends Record<string, any>
>(
component:
| ComponentType<SvelteComponent<Props>>
| Component<Props, Exports, any>,
options: MountOptions<Props>
): Exports;
```

## onDestroy[](https://svelte.dev/docs/svelte/svelte#onDestroy)

Schedules a callback to run immediately before the component is unmounted.

Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the only one that runs inside a server-side component.

```javascript
function onDestroy(fn: () => any): void;
```

## onMount[](https://svelte.dev/docs/svelte/svelte#onMount)

`onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM. Unlike `$effect`, the provided function only runs once.

It must be called during the component’s initialisation (but doesn’t need to live _inside_ the component; it can be called from an external module). If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.

`onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).

```typescript
function onMount<T>(
fn: () =>
| NotFunction<T>
| Promise<NotFunction<T>>
| (() => any)
): void;
```

## setContext[](https://svelte.dev/docs/svelte/svelte#setContext)

Associates an arbitrary `context` object with the current component and the specified `key` and returns that object. The context is then available to children of the component (including slotted content) with `getContext`.

Like lifecycle functions, this must be called during component initialisation.

[`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.

```r
function setContext<T>(key: any, context: T): T;
```

## settled[](https://svelte.dev/docs/svelte/svelte#settled)

> Available since 5.36

Returns a promise that resolves once any state changes, and asynchronous work resulting from them, have resolved and the DOM has been updated

```javascript
function settled(): Promise<void>;
```

## tick[](https://svelte.dev/docs/svelte/svelte#tick)

Returns a promise that resolves once any pending state changes have been applied.

```javascript
function tick(): Promise<void>;
```

## unmount[](https://svelte.dev/docs/svelte/svelte#unmount)

Unmounts a component that was previously mounted using `mount` or `hydrate`.

Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.

Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).

```javascript
import { mount, unmount } from 'svelte';
import App from './App.svelte';

const app = mount(App, { target: document.body });

// later...
unmount(app, { outro: true });
```

```typescript
function unmount(
component: Record<string, any>,
options?:
| {
outro?: boolean;
  }
| undefined
): Promise<void>;
```

## untrack[](https://svelte.dev/docs/svelte/svelte#untrack)

When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect), any state read inside `fn` will not be treated as a dependency.

```perl
$effect(() => {
// this will run when `data` changes, but not when `time` changes
save(data, {
timestamp: untrack(() => time)
});
});
```

```r
function untrack<T>(fn: () => T): T;
```

## Component[](https://svelte.dev/docs/svelte/svelte#Component)

Can be used to create strongly typed Svelte components.

#### Example:[](https://svelte.dev/docs/svelte/svelte#Component-Example:)

You have component library on npm called `component-library`, from which you export a component called `MyComponent`. For Svelte+TypeScript users, you want to provide typings. Therefore you create a `index.d.ts`:

```typescript
import type { Component } from 'svelte';
export declare const MyComponent: Component<{ foo: string }> {}
```

Typing this makes it possible for IDEs like VS Code with the Svelte extension to provide intellisense and to use the component like this in a Svelte file with TypeScript:

```php-template
<script lang="ts">
import { MyComponent } from "component-library";
</script>
<MyComponent foo={'bar'} />
```

```typescript
interface Component<
Props extends Record<string, any> = {},
Exports extends Record<string, any> = {},
Bindings extends keyof Props | '' = string
> {…}
```

```php
(
this: void,
internals: ComponentInternals,
props: Props
): {
/**
 * @deprecated This method only exists when using one of the legacy compatibility helpers, which
 * is a stop-gap solution. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes)
 * for more info.
 */
$on?(type: string, callback: (e: any) => void): () => void;
/**
 * @deprecated This method only exists when using one of the legacy compatibility helpers, which
 * is a stop-gap solution. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes)
 * for more info.
 */
$set?(props: Partial<Props>): void;
} & Exports;
```

-   `internal` An internal object used by Svelte. Do not use or modify.
-   `props` The props passed to the component.

```csharp
element?: typeof HTMLElement;
```

The custom element version of the component. Only present if compiled with the `customElement` compiler option

## ComponentConstructorOptions[](https://svelte.dev/docs/svelte/svelte#ComponentConstructorOptions)

> In Svelte 4, components are classes. In Svelte 5, they are functions. Use `mount` instead to instantiate components. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

```typescript
interface ComponentConstructorOptions<
Props extends Record<string, any> = Record<string, any>
> {…}
```

```css
target: Element | Document | ShadowRoot;
```

## ComponentEvents[](https://svelte.dev/docs/svelte/svelte#ComponentEvents)

> The new `Component` type does not have a dedicated Events type. Use `ComponentProps` instead.

```typescript
type ComponentEvents<Comp extends SvelteComponent> =
Comp extends SvelteComponent<any, infer Events>
? Events
: never;
```

## ComponentInternals[](https://svelte.dev/docs/svelte/svelte#ComponentInternals)

Internal implementation details that vary between environments

```bash
type ComponentInternals = Branded<{}, 'ComponentInternals'>;
```

## ComponentProps[](https://svelte.dev/docs/svelte/svelte#ComponentProps)

Convenience type to get the props the given component expects.

Example: Ensure a variable contains the props expected by `MyComponent`:

```typescript
import type { ComponentProps } from 'svelte';
import MyComponent from './MyComponent.svelte';

// Errors if these aren't the correct props expected by MyComponent.
const props: ComponentProps<typeof MyComponent> = { foo: 'bar' };
```

> In Svelte 4, you would do `ComponentProps<MyComponent>` because `MyComponent` was a class.

Example: A generic function that accepts some component and infers the type of its props:

```typescript
import type { Component, ComponentProps } from 'svelte';
import MyComponent from './MyComponent.svelte';

function withProps<TComponent extends Component<any>>(
component: TComponent,
props: ComponentProps<TComponent>
) {};

// Errors if the second argument is not the correct props expected by the component in the first argument.
withProps(MyComponent, { foo: 'bar' });
```

```typescript
type ComponentProps<
Comp extends SvelteComponent | Component<any, any>
> =
Comp extends SvelteComponent<infer Props>
? Props
: Comp extends Component<infer Props, any>
? Props
: never;
```

## ComponentType[](https://svelte.dev/docs/svelte/svelte#ComponentType)

> This type is obsolete when working with the new `Component` type.

```swift
type ComponentType<
Comp extends SvelteComponent = SvelteComponent
> = (new (
options: ComponentConstructorOptions<
Comp extends SvelteComponent<infer Props>
? Props
: Record<string, any>
>
) => Comp) & {
/** The custom element version of the component. Only present if compiled with the `customElement` compiler option */
element?: typeof HTMLElement;
};
```

## EventDispatcher[](https://svelte.dev/docs/svelte/svelte#EventDispatcher)

```typescript
interface EventDispatcher<
EventMap extends Record<string, any>
> {…}
```

```typescript
<Type extends keyof EventMap>(
...args: null extends EventMap[Type]
? [type: Type, parameter?: EventMap[Type] | null | undefined, options?: DispatchOptions]
: undefined extends EventMap[Type]
? [type: Type, parameter?: EventMap[Type] | null | undefined, options?: DispatchOptions]
: [type: Type, parameter: EventMap[Type], options?: DispatchOptions]
): boolean;
```

## Fork[](https://svelte.dev/docs/svelte/svelte#Fork)

> Available since 5.42

Represents work that is happening off-screen, such as data being preloaded in anticipation of the user navigating

Commit the fork. The promise will resolve once the state change has been applied

## MountOptions[](https://svelte.dev/docs/svelte/svelte#MountOptions)

Defines the options accepted by the `mount()` function.

```swift
type MountOptions<
Props extends Record<string, any> = Record<string, any>
> = {
/**
 * Target element where the component will be mounted.
 */
target: Document | Element | ShadowRoot;
/**
 * Optional node inside `target`. When specified, it is used to render the component immediately before it.
 */
anchor?: Node;
/**
 * Allows the specification of events.
 * @deprecated Use callback props instead.
 */
events?: Record<string, (e: any) => any>;
/**
 * Can be accessed via `getContext()` at the component level.
 */
context?: Map<any, any>;
/**
 * Whether or not to play transitions on initial render.
 * @default true
 */
intro?: boolean;
} & ({} extends Props
? {
/**
 * Component properties.
 */
props?: Props;
}
: {
/**
 * Component properties.
 */
props: Props;
});
```

## Snippet[](https://svelte.dev/docs/svelte/svelte#Snippet)

The type of a `#snippet` block. You can use it to (for example) express that your component expects a snippet of a certain type:

```swift
let { banner }: { banner: Snippet<[{ text: string }]> } = $props();
```

You can only call a snippet through the `{@render ...}` tag.

See the [snippet documentation](https://svelte.dev/docs/svelte/snippet) for more info.

```typescript
interface Snippet<Parameters extends unknown[] = []> {…}
```

```typescript
(
this: void,
// this conditional allows tuples but not arrays. Arrays would indicate a
// rest parameter type, which is not supported. If rest parameters are added
// in the future, the condition can be removed.
...args: number extends Parameters['length'] ? never : Parameters
): {
'{@render ...} must be called with a Snippet': "import type { Snippet } from 'svelte'";
} & typeof SnippetReturn;
```