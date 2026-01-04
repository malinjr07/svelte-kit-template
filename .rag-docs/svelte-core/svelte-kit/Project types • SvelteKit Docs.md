SvelteKit offers configurable rendering, which allows you to build and deploy your project in several different ways. You can build all of the below types of applications and more with SvelteKit. Rendering settings are not mutually exclusive and you may choose the optimal manner with which to render different parts of your application.

If you don’t have a particular way you’d like to build your application in mind, don’t worry! The way your application is built, deployed, and rendered is controlled by which adapter you’ve chosen and a small amount of configuration and these can always be changed later. The [project structure](https://svelte.dev/docs/kit/project-structure) and [routing](https://svelte.dev/docs/kit/glossary#Routing) will be the same regardless of the project type that you choose.

## Default rendering[](https://svelte.dev/docs/kit/project-types#Default-rendering)

By default, when a user visits a site, SvelteKit will render the first page with [server-side rendering (SSR)](https://svelte.dev/docs/kit/glossary#SSR) and subsequent pages with [client-side rendering (CSR)](https://svelte.dev/docs/kit/glossary#CSR). Using SSR for the initial render improves SEO and perceived performance of the initial page load. Client-side rendering then takes over and updates the page without having to rerender common components, which is typically faster and eliminates a flash when navigating between pages. Apps built with this hybrid rendering approach have also been called [transitional apps](https://www.youtube.com/watch?v=860d8usGC0o).

## Static site generation[](https://svelte.dev/docs/kit/project-types#Static-site-generation)

You can use SvelteKit as a [static site generator (SSG)](https://svelte.dev/docs/kit/glossary#SSG) that fully [prerenders](https://svelte.dev/docs/kit/glossary#Prerendering) your site with static rendering using [`adapter-static`](https://svelte.dev/docs/kit/adapter-static). You may also use [the prerender option](https://svelte.dev/docs/kit/page-options#prerender) to prerender only some pages and then choose a different adapter with which to dynamically server-render other pages.

Tools built solely to do static site generation may scale the prerendering process more efficiently during build when rendering a very large number of pages. When working with very large statically generated sites, you can avoid long build times with [Incremental Static Regeneration (ISR) if using `adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel#Incremental-Static-Regeneration). And in contrast to purpose-built SSGs, SvelteKit allows for nicely mixing and matching different rendering types on different pages.

## Single-page app[](https://svelte.dev/docs/kit/project-types#Single-page-app)

[Single-page apps (SPAs)](https://svelte.dev/docs/kit/glossary#SPA) exclusively use [client-side rendering (CSR)](https://svelte.dev/docs/kit/glossary#CSR). You can [build single-page apps (SPAs)](https://svelte.dev/docs/kit/single-page-apps) with SvelteKit. As with all types of SvelteKit applications, you can write your backend in SvelteKit or [another language or framework](https://svelte.dev/docs/kit/project-types#Separate-backend). If you are building an application with no backend or a [separate backend](https://svelte.dev/docs/kit/project-types#Separate-backend), you can simply skip over and ignore the parts of the docs talking about `server` files.

## Multi-page app[](https://svelte.dev/docs/kit/project-types#Multi-page-app)

SvelteKit isn’t typically used to build [traditional multi-page apps](https://svelte.dev/docs/kit/glossary#MPA). However, in SvelteKit you can remove all JavaScript on a page with [`csr = false`](https://svelte.dev/docs/kit/page-options#csr), which will render subsequent links on the server, or you can use [`data-sveltekit-reload`](https://svelte.dev/docs/kit/link-options#data-sveltekit-reload) to render specific links on the server.

## Separate backend[](https://svelte.dev/docs/kit/project-types#Separate-backend)

If your backend is written in another language such as Go, Java, PHP, Ruby, Rust, or C#, there are a couple of ways that you can deploy your application. The most recommended way would be to deploy your SvelteKit frontend separately from your backend utilizing `adapter-node` or a serverless adapter. Some users prefer not to have a separate process to manage and decide to deploy their application as a [single-page app (SPA)](https://svelte.dev/docs/kit/single-page-apps) served by their backend server, but note that single-page apps have worse SEO and performance characteristics.

If you are using an external backend, you can simply skip over and ignore the parts of the docs talking about `server` files. You may also want to reference [the FAQ about how to make calls to a separate backend](https://svelte.dev/docs/kit/faq#How-do-I-use-a-different-backend-API-server).

## Serverless app[](https://svelte.dev/docs/kit/project-types#Serverless-app)

SvelteKit apps are simple to run on serverless platforms. [The default zero config adapter](https://svelte.dev/docs/kit/adapter-auto) will automatically run your app on a number of supported platforms or you can use [`adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel), [`adapter-netlify`](https://svelte.dev/docs/kit/adapter-netlify), or [`adapter-cloudflare`](https://svelte.dev/docs/kit/adapter-cloudflare) to provide platform-specific configuration. And [community adapters](https://svelte.dev/packages#sveltekit-adapters) allow you to deploy your application to almost any serverless environment. Some of these adapters such as [`adapter-vercel`](https://svelte.dev/docs/kit/adapter-vercel) and [`adapter-netlify`](https://svelte.dev/docs/kit/adapter-netlify) offer an `edge` option, to support [edge rendering](https://svelte.dev/docs/kit/glossary#Edge) for improved latency.

## Your own server[](https://svelte.dev/docs/kit/project-types#Your-own-server)

You can deploy to your own server or VPS using [`adapter-node`](https://svelte.dev/docs/kit/adapter-node).

## Container[](https://svelte.dev/docs/kit/project-types#Container)

You can use [`adapter-node`](https://svelte.dev/docs/kit/adapter-node) to run a SvelteKit app within a container such as Docker or LXC.

## Library[](https://svelte.dev/docs/kit/project-types#Library)

You can create a library to be used by other Svelte apps with the [`@sveltejs/package`](https://svelte.dev/docs/kit/packaging) add-on to SvelteKit by choosing the library option when running [`sv create`](https://svelte.dev/docs/cli/sv-create).

## Offline app[](https://svelte.dev/docs/kit/project-types#Offline-app)

SvelteKit has full support for [service workers](https://svelte.dev/docs/kit/service-workers) allowing you to build many types of applications such as offline apps and [progressive web apps](https://svelte.dev/docs/kit/glossary#PWA).

## Mobile app[](https://svelte.dev/docs/kit/project-types#Mobile-app)

You can turn a [SvelteKit SPA](https://svelte.dev/docs/kit/single-page-apps) into a mobile app with [Tauri](https://v2.tauri.app/start/frontend/sveltekit/) or [Capacitor](https://capacitorjs.com/solution/svelte). Mobile features like the camera, geolocation, and push notifications are available via plugins for both platforms.

These mobile development platforms work by starting a local web server and then serving your application like a static host on your phone. You may find [`bundleStrategy: 'single'`](https://svelte.dev/docs/kit/configuration#output) to be a helpful option to limit the number of requests made. E.g. at the time of writing, the Capacitor local server uses HTTP/1, which limits the number of concurrent connections.

## Desktop app[](https://svelte.dev/docs/kit/project-types#Desktop-app)

You can turn a [SvelteKit SPA](https://svelte.dev/docs/kit/single-page-apps) into a desktop app with [Tauri](https://v2.tauri.app/start/frontend/sveltekit/), [Wails](https://wails.io/docs/guides/sveltekit/), or [Electron](https://www.electronjs.org/).

## Browser extension[](https://svelte.dev/docs/kit/project-types#Browser-extension)

You can build browser extensions using either [`adapter-static`](https://svelte.dev/docs/kit/adapter-static) or [community adapters](https://svelte.dev/packages#sveltekit-adapters) specifically tailored towards browser extensions.

## Embedded device[](https://svelte.dev/docs/kit/project-types#Embedded-device)

Because of its efficient rendering, Svelte can be run on low power devices. Embedded devices like microcontrollers and TVs may limit the number of concurrent connections. In order to reduce the number of concurrent requests, you may find [`bundleStrategy: 'single'`](https://svelte.dev/docs/kit/configuration#output) to be a helpful option in this deployment configuration.