This module provides various functions for use during the migration, since some features can’t be replaced one to one with new features. All imports are marked as deprecated and should be migrated away from over time.

```python
import {
asClassComponent,
createBubbler,
createClassComponent,
run,
self,
stopImmediatePropagation,
stopPropagation,
trusted
} from 'svelte/legacy';
```

## asClassComponent[](https://svelte.dev/docs/svelte/svelte-legacy#asClassComponent)

> Use this only as a temporary solution to migrate your imperative component code to Svelte 5.

Takes the component function and returns a Svelte 4 compatible component constructor.

```typescript
function asClassComponent<
Props extends Record<string, any>,
Exports extends Record<string, any>,
Events extends Record<string, any>,
Slots extends Record<string, any>
>(
component:
| SvelteComponent<Props, Events, Slots>
| Component<Props>
): ComponentType<
SvelteComponent<Props, Events, Slots> & Exports
>;
```

## createBubbler[](https://svelte.dev/docs/svelte/svelte-legacy#createBubbler)

> Use this only as a temporary solution to migrate your automatically delegated events in Svelte 5.

Function to create a `bubble` function that mimic the behavior of `on:click` without handler available in svelte 4.

```typescript
function createBubbler(): (
type: string
) => (event: Event) => boolean;
```

## createClassComponent[](https://svelte.dev/docs/svelte/svelte-legacy#createClassComponent)

> Use this only as a temporary solution to migrate your imperative component code to Svelte 5.

Takes the same options as a Svelte 4 component and the component function and returns a Svelte 4 compatible component.

```swift
function createClassComponent<
Props extends Record<string, any>,
Exports extends Record<string, any>,
Events extends Record<string, any>,
Slots extends Record<string, any>
>(
options: ComponentConstructorOptions<Props> & {
component:
| ComponentType<SvelteComponent<Props, Events, Slots>>
| Component<Props>;
}
): SvelteComponent<Props, Events, Slots> & Exports;
```

## handlers[](https://svelte.dev/docs/svelte/svelte-legacy#handlers)

Function to mimic the multiple listeners available in svelte 4

```cpp
function handlers(
...handlers: EventListener[]
): EventListener;
```

## nonpassive[](https://svelte.dev/docs/svelte/svelte-legacy#nonpassive)

Substitute for the `nonpassive` event modifier, implemented as an action

```csharp
function nonpassive(
node: HTMLElement,
[event, handler]: [
event: string,
handler: () => EventListener
]
): void;
```

## once[](https://svelte.dev/docs/svelte/svelte-legacy#once)

Substitute for the `once` event modifier

```typescript
function once(
fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

## passive[](https://svelte.dev/docs/svelte/svelte-legacy#passive)

Substitute for the `passive` event modifier, implemented as an action

```csharp
function passive(
node: HTMLElement,
[event, handler]: [
event: string,
handler: () => EventListener
]
): void;
```

## preventDefault[](https://svelte.dev/docs/svelte/svelte-legacy#preventDefault)

Substitute for the `preventDefault` event modifier

```typescript
function preventDefault(
fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

## run[](https://svelte.dev/docs/svelte/svelte-legacy#run)

> Use this only as a temporary solution to migrate your component code to Svelte 5.

Runs the given function once immediately on the server, and works like `$effect.pre` on the client.

```javascript
function run(fn: () => void | (() => void)): void;
```

## self[](https://svelte.dev/docs/svelte/svelte-legacy#self)

Substitute for the `self` event modifier

```typescript
function self(
fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

Substitute for the `stopImmediatePropagation` event modifier

```typescript
function stopImmediatePropagation(
fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

## stopPropagation[](https://svelte.dev/docs/svelte/svelte-legacy#stopPropagation)

Substitute for the `stopPropagation` event modifier

```typescript
function stopPropagation(
fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

## trusted[](https://svelte.dev/docs/svelte/svelte-legacy#trusted)

Substitute for the `trusted` event modifier

```typescript
function trusted(
fn: (event: Event, ...args: Array<unknown>) => void
): (event: Event, ...args: unknown[]) => void;
```

## LegacyComponentType[](https://svelte.dev/docs/svelte/svelte-legacy#LegacyComponentType)

Support using the component as both a class and function during the transition period

```swift
type LegacyComponentType = {
new (o: ComponentConstructorOptions): SvelteComponent;
(
...args: Parameters<Component<Record<string, any>>>
): ReturnType<
Component<Record<string, any>, Record<string, any>>
>;
};
```