> `adapter-cloudflare-workers` has been deprecated in favour of [`adapter-cloudflare`](https://svelte.dev/docs/kit/adapter-cloudflare). We recommend using `adapter-cloudflare` to deploy to Cloudflare Workers with [Static Assets](https://developers.cloudflare.com/workers/static-assets/) since Cloudflare Workers Sites will be deprecated in favour of it.

To deploy to [Cloudflare Workers](https://workers.cloudflare.com/) with [Workers Sites](https://developers.cloudflare.com/workers/configuration/sites/), use `adapter-cloudflare-workers`.

## Usage[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Usage)

Install with `npm i -D @sveltejs/adapter-cloudflare-workers`, then add the adapter to your `svelte.config.js`:

svelte.config

```javascript
import adapter from '@sveltejs/adapter-cloudflare-workers';

/** @type {import('@sveltejs/kit').Config} */
const config = {
kit: {
adapter: adapter({
// see below for options that can be set here
})
}
};

export default config;
```

## Options[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Options)

### config[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Options-config)

Path to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). If you would like to use a Wrangler configuration filename other than `wrangler.jsonc`, `wrangler.json`, or `wrangler.toml` you can specify it using this option.

### platformProxy[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Options-platformProxy)

Preferences for the emulated `platform.env` local bindings. See the [getPlatformProxy](https://developers.cloudflare.com/workers/wrangler/api/#parameters-1) Wrangler API documentation for a full list of options.

## Basic Configuration[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Basic-Configuration)

This adapter expects to find a [Wrangler configuration file](https://developers.cloudflare.com/workers/configuration/sites/configuration/) in the project root. It should look something like this:

wrangler

```json
{
"name": "<your-service-name>",
"account_id": "<your-account-id>",
"main": "./.cloudflare/worker.js",
"site": {
"bucket": "./.cloudflare/public"
},
"build": {
"command": "npm run build"
},
"compatibility_date": "2021-11-12"
}
```

`<your-service-name>` can be anything. `<your-account-id>` can be found by running `wrangler whoami` using the Wrangler CLI tool or by logging into your [Cloudflare dashboard](https://dash.cloudflare.com/) and grabbing it from the end of the URL:

```bash
https://dash.cloudflare.com/<your-account-id>/home
```

> You should add the `.cloudflare` directory (or whichever directories you specified for `main` and `site.bucket`) and the `.wrangler` directory to your `.gitignore`.

You will need to install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) and log in, if you haven’t already:

```css
npm i -D wrangler
wrangler login
```

Then, you can build your app and deploy it:

## Runtime APIs[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Runtime-APIs)

The [`env`](https://developers.cloudflare.com/workers/runtime-apis/fetch-event#parameters) object contains your project’s [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/), which consist of KV/DO namespaces, etc. It is passed to SvelteKit via the `platform` property, along with [`ctx`](https://developers.cloudflare.com/workers/runtime-apis/context/), [`caches`](https://developers.cloudflare.com/workers/runtime-apis/cache/), and [`cf`](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties), meaning that you can access it in hooks and endpoints:

> SvelteKit’s built-in [`$env` module](https://svelte.dev/docs/kit/$env-static-private) should be preferred for environment variables.

To make these types available to your app, install [`@cloudflare/workers-types`](https://www.npmjs.com/package/@cloudflare/workers-types) and reference them in your `src/app.d.ts`:

src/app.d

```typescript
import { KVNamespace, DurableObjectNamespace } from '@cloudflare/workers-types';

declare global {
namespace App {
interface Platform {
env?: {
YOUR_KV_NAMESPACE: KVNamespace;
YOUR_DURABLE_OBJECT_NAMESPACE: DurableObjectNamespace;
};
}
}
}

export {};
```

### Testing Locally[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Runtime-APIs-Testing-Locally)

Cloudflare Workers specific values in the `platform` property are emulated during dev and preview modes. Local [bindings](https://developers.cloudflare.com/workers/wrangler/configuration/#bindings) are created based on your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/) and are used to populate `platform.env` during development and preview. Use the adapter config [`platformProxy` option](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Options-platformProxy) to change your preferences for the bindings.

For testing the build, you should use [Wrangler](https://developers.cloudflare.com/workers/wrangler/) version 4. Once you have built your site, run `wrangler dev`.

## Troubleshooting[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Troubleshooting)

### Node.js compatibility[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Troubleshooting-Node.js-compatibility)

If you would like to enable [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/), you can add the `nodejs_compat` compatibility flag to your Wrangler configuration file:

wrangler

```json
{
"compatibility_flags": ["nodejs_compat"]
}
```

### Worker size limits[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Troubleshooting-Worker-size-limits)

When deploying your application, the server generated by SvelteKit is bundled into a single file. Wrangler will fail to publish your worker if it exceeds [the size limits](https://developers.cloudflare.com/workers/platform/limits/#worker-size) after minification. You’re unlikely to hit this limit usually, but some large libraries can cause this to happen. In that case, you can try to reduce the size of your worker by only importing such libraries on the client side. See [the FAQ](https://svelte.dev/docs/kit/faq#How-do-I-use-a-client-side-library-accessing-document-or-window) for more information.

### Accessing the file system[](https://svelte.dev/docs/kit/adapter-cloudflare-workers#Troubleshooting-Accessing-the-file-system)

You can’t use `fs` in Cloudflare Workers — you must [prerender](https://svelte.dev/docs/kit/page-options#prerender) the routes in question.