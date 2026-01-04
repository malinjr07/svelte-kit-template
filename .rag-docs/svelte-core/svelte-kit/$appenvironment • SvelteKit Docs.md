```javascript
import { browser, building, dev, version } from '$app/environment';
```

## browser[](https://svelte.dev/docs/kit/$app-environment#browser)

`true` if the app is running in the browser.

```php
const browser: boolean;
```

## building[](https://svelte.dev/docs/kit/$app-environment#building)

SvelteKit analyses your app during the `build` step by running it. During this process, `building` is `true`. This also applies during prerendering.

```php
const building: boolean;
```

## dev[](https://svelte.dev/docs/kit/$app-environment#dev)

Whether the dev server is running. This is not guaranteed to correspond to `NODE_ENV` or `MODE`.

```php
const dev: boolean;
```

## version[](https://svelte.dev/docs/kit/$app-environment#version)

The value of `config.kit.version.name`.

```csharp
const version: string;
```