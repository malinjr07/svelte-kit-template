[SvelteKit adapters](https://svelte.dev/docs/kit/adapters) allow you to deploy your site to numerous platforms. This add-on allows you to configure officially provided SvelteKit adapters, but a number of [community-provided adapters](https://www.sveltesociety.dev/packages?category=sveltekit-adapters) are also available.

## Usage[](https://svelte.dev/docs/cli/sveltekit-adapter#Usage)

```csharp
npx sv add sveltekit-adapter
```

## What you get[](https://svelte.dev/docs/cli/sveltekit-adapter#What-you-get)

-   the chosen SvelteKit adapter installed and configured in your `svelte.config.js`

## Options[](https://svelte.dev/docs/cli/sveltekit-adapter#Options)

### adapter[](https://svelte.dev/docs/cli/sveltekit-adapter#Options-adapter)

Which SvelteKit adapter to use:

-   `auto` — [`@sveltejs/adapter-auto`](https://svelte.dev/docs/kit/adapter-auto) automatically chooses the proper adapter to use, but is less configurable
-   `node` — [`@sveltejs/adapter-node`](https://svelte.dev/docs/kit/adapter-node) generates a standalone Node server
-   `static` — [`@sveltejs/adapter-static`](https://svelte.dev/docs/kit/adapter-static) allows you to use SvelteKit as a static site generator (SSG)
-   `vercel` — [`@sveltejs/adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel) allows you to deploy to Vercel
-   `cloudflare` — [`@sveltejs/adapter-cloudflare`](https://svelte.dev/docs/kit/adapter-cloudflare) allows you to deploy to Cloudflare
-   `netlify` — [`@sveltejs/adapter-netlify`](https://svelte.dev/docs/kit/adapter-netlify) allows you to deploy to Netlify

```csharp
npx sv add sveltekit-adapter="adapter:node"
```