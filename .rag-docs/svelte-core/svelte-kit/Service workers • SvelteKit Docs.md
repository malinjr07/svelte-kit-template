Service workers act as proxy servers that handle network requests inside your app. This makes it possible to make your app work offline, but even if you don’t need offline support (or can’t realistically implement it because of the type of app you’re building), it’s often worth using service workers to speed up navigation by precaching your built JS and CSS.

In SvelteKit, if you have a `src/service-worker.js` file (or `src/service-worker/index.js`) it will be bundled and automatically registered. You can change the [location of your service worker](https://svelte.dev/docs/kit/configuration#files) if you need to.

You can [disable automatic registration](https://svelte.dev/docs/kit/configuration#serviceWorker) if you need to register the service worker with your own logic or use another solution. The default registration looks something like this:

```javascript
if ('serviceWorker' in navigator) {
addEventListener('load', function () {
navigator.serviceWorker.register('./path/to/service-worker.js');
});
}
```

## Inside the service worker[](https://svelte.dev/docs/kit/service-workers#Inside-the-service-worker)

Inside the service worker you have access to the [`$service-worker` module](https://svelte.dev/docs/kit/$service-worker), which provides you with the paths to all static assets, build files and prerendered pages. You’re also provided with an app version string, which you can use for creating a unique cache name, and the deployment’s `base` path. If your Vite config specifies `define` (used for global variable replacements), this will be applied to service workers as well as your server/client builds.

The following example caches the built app and any files in `static` eagerly, and caches all other requests as they happen. This would make each page work offline once visited.

> Be careful when caching! In some cases, stale data might be worse than data that’s unavailable while offline. Since browsers will empty caches if they get too full, you should also be careful about caching large assets like video files.

## During development[](https://svelte.dev/docs/kit/service-workers#During-development)

The service worker is bundled for production, but not during development. For that reason, only browsers that support [modules in service workers](https://web.dev/es-modules-in-sw) will be able to use them at dev time. If you are manually registering your service worker, you will need to pass the `{ type: 'module' }` option in development:

```go
import { dev } from '$app/environment';

navigator.serviceWorker.register('/service-worker.js', {
type: dev ? 'module' : 'classic'
});
```

> `build` and `prerendered` are empty arrays during development

## Other solutions[](https://svelte.dev/docs/kit/service-workers#Other-solutions)

SvelteKit’s service worker implementation is designed to be easy to work with and is probably a good solution for most users. However, outside of SvelteKit, many PWA applications leverage the [Workbox](https://web.dev/learn/pwa/workbox) library. If you’re used to using Workbox you may prefer [Vite PWA plugin](https://vite-pwa-org.netlify.app/frameworks/sveltekit.html).

## References[](https://svelte.dev/docs/kit/service-workers#References)

For more general information on service workers, we recommend [the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).