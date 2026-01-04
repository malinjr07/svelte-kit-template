```bash
import {
command,
form,
getRequestEvent,
prerender,
query,
read
} from '$app/server';
```

## command[](https://svelte.dev/docs/kit/$app-server#command)

> Available since 2.27

Creates a remote command. When called from the browser, the function will be invoked on the server via a `fetch` call.

See [Remote functions](https://svelte.dev/docs/kit/remote-functions#command) for full documentation.

```csharp
function command<Output>(
fn: () => Output
): RemoteCommand<void, Output>;
```

```javascript
function command<Input, Output>(
validate: 'unchecked',
fn: (arg: Input) => Output
): RemoteCommand<Input, Output>;
```

```javascript
function command<Schema extends StandardSchemaV1, Output>(
validate: Schema,
fn: (arg: StandardSchemaV1.InferOutput<Schema>) => Output
): RemoteCommand<
StandardSchemaV1.InferInput<Schema>,
Output
>;
```

## form[](https://svelte.dev/docs/kit/$app-server#form)

> Available since 2.27

Creates a form object that can be spread onto a `<form>` element.

See [Remote functions](https://svelte.dev/docs/kit/remote-functions#form) for full documentation.

```csharp
function form<Output>(
fn: () => MaybePromise<Output>
): RemoteForm<void, Output>;
```

```javascript
function form<Input extends RemoteFormInput, Output>(
validate: 'unchecked',
fn: (
data: Input,
issue: InvalidField<Input>
) => MaybePromise<Output>
): RemoteForm<Input, Output>;
```

```swift
function form<
Schema extends StandardSchemaV1<
RemoteFormInput,
Record<string, any>
>,
Output
>(
validate: Schema,
fn: (
data: StandardSchemaV1.InferOutput<Schema>,
issue: InvalidField<StandardSchemaV1.InferInput<Schema>>
) => MaybePromise<Output>
): RemoteForm<StandardSchemaV1.InferInput<Schema>, Output>;
```

## getRequestEvent[](https://svelte.dev/docs/kit/$app-server#getRequestEvent)

> Available since 2.20.0

Returns the current `RequestEvent`. Can be used inside server hooks, server `load` functions, actions, and endpoints (and functions called by them).

In environments without [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage), this must be called synchronously (i.e. not after an `await`).

```cpp
function getRequestEvent(): RequestEvent;
```

## prerender[](https://svelte.dev/docs/kit/$app-server#prerender)

> Available since 2.27

Creates a remote prerender function. When called from the browser, the function will be invoked on the server via a `fetch` call.

See [Remote functions](https://svelte.dev/docs/kit/remote-functions#prerender) for full documentation.

```typescript
function prerender<Output>(
fn: () => MaybePromise<Output>,
options?:
| {
inputs?: RemotePrerenderInputsGenerator<void>;
dynamic?: boolean;
  }
| undefined
): RemotePrerenderFunction<void, Output>;
```

```typescript
function prerender<Input, Output>(
validate: 'unchecked',
fn: (arg: Input) => MaybePromise<Output>,
options?:
| {
inputs?: RemotePrerenderInputsGenerator<Input>;
dynamic?: boolean;
  }
| undefined
): RemotePrerenderFunction<Input, Output>;
```

```swift
function prerender<Schema extends StandardSchemaV1, Output>(
schema: Schema,
fn: (
arg: StandardSchemaV1.InferOutput<Schema>
) => MaybePromise<Output>,
options?:
| {
inputs?: RemotePrerenderInputsGenerator<
StandardSchemaV1.InferInput<Schema>
>;
dynamic?: boolean;
  }
| undefined
): RemotePrerenderFunction<
StandardSchemaV1.InferInput<Schema>,
Output
>;
```

## query[](https://svelte.dev/docs/kit/$app-server#query)

> Available since 2.27

Creates a remote query. When called from the browser, the function will be invoked on the server via a `fetch` call.

See [Remote functions](https://svelte.dev/docs/kit/remote-functions#query) for full documentation.

```csharp
function query<Output>(
fn: () => MaybePromise<Output>
): RemoteQueryFunction<void, Output>;
```

```javascript
function query<Input, Output>(
validate: 'unchecked',
fn: (arg: Input) => MaybePromise<Output>
): RemoteQueryFunction<Input, Output>;
```

```javascript
function query<Schema extends StandardSchemaV1, Output>(
schema: Schema,
fn: (
arg: StandardSchemaV1.InferOutput<Schema>
) => MaybePromise<Output>
): RemoteQueryFunction<
StandardSchemaV1.InferInput<Schema>,
Output
>;
```

## read[](https://svelte.dev/docs/kit/$app-server#read)

> Available since 2.4.0

Read the contents of an imported asset from the filesystem

```javascript
import { read } from '$app/server';
import somefile from './somefile.txt';

const asset = read(somefile);
const text = await asset.text();
```

```php
function read(asset: string): Response;
```

## query[](https://svelte.dev/docs/kit/$app-server#query)

```typescript
namespace query {
/**
 * Creates a batch query function that collects multiple calls and executes them in a single request
 *
 * See [Remote functions](https://svelte.dev/docs/kit/remote-functions#query.batch) for full documentation.
 *
 * @since 2.35
 */
function batch<Input, Output>(
validate: 'unchecked',
fn: (
args: Input[]
) => MaybePromise<(arg: Input, idx: number) => Output>
): RemoteQueryFunction<Input, Output>;
/**
 * Creates a batch query function that collects multiple calls and executes them in a single request
 *
 * See [Remote functions](https://svelte.dev/docs/kit/remote-functions#query.batch) for full documentation.
 *
 * @since 2.35
 */
function batch<Schema extends StandardSchemaV1, Output>(
schema: Schema,
fn: (
args: StandardSchemaV1.InferOutput<Schema>[]
) => MaybePromise<
(
arg: StandardSchemaV1.InferOutput<Schema>,
idx: number
) => Output
>
): RemoteQueryFunction<
StandardSchemaV1.InferInput<Schema>,
Output
>;
}
```