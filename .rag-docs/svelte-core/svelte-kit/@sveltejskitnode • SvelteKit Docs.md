```javascript
import {
createReadableStream,
getRequest,
setResponse
} from '@sveltejs/kit/node';
```

## createReadableStream[](https://svelte.dev/docs/kit/@sveltejs-kit-node#createReadableStream)

> Available since 2.4.0

Converts a file on disk to a readable stream

```csharp
function createReadableStream(file: string): ReadableStream;
```

## getRequest[](https://svelte.dev/docs/kit/@sveltejs-kit-node#getRequest)

```typescript
function getRequest({
request,
base,
bodySizeLimit
}: {
request: import('http').IncomingMessage;
base: string;
bodySizeLimit?: number;
}): Promise<Request>;
```

## setResponse[](https://svelte.dev/docs/kit/@sveltejs-kit-node#setResponse)

```javascript
function setResponse(
res: import('http').ServerResponse,
response: Response
): Promise<void>;
```