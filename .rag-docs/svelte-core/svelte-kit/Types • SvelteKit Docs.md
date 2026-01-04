## Generated types[](https://svelte.dev/docs/kit/types#Generated-types)

The `RequestHandler` and `Load` types both accept a `Params` argument allowing you to type the `params` object. For example this endpoint expects `foo`, `bar` and `baz` params:

src/routes/\[foo\]/\[bar\]/\[baz\]/+server

Needless to say, this is cumbersome to write out, and less portable (if you were to rename the `[foo]` directory to `[qux]`, the type would no longer reflect reality).

To solve this problem, SvelteKit generates `.d.ts` files for each of your endpoints and pages:

.svelte-kit/types/src/routes/\[foo\]/\[bar\]/\[baz\]/$types.d

```typescript
import type * as Kit from '@sveltejs/kit';

type RouteParams = {
foo: string;
bar: string;
baz: string;
};

export type RequestHandler = Kit.RequestHandler<RouteParams>;
export type PageLoad = Kit.Load<RouteParams>;
```

These files can be imported into your endpoints and pages as siblings, thanks to the [`rootDirs`](https://www.typescriptlang.org/tsconfig#rootDirs) option in your TypeScript configuration:

src/routes/\[foo\]/\[bar\]/\[baz\]/+server

src/routes/\[foo\]/\[bar\]/\[baz\]/+page

The return types of the load functions are then available through the `$types` module as `PageData` and `LayoutData` respectively, while the union of the return values of all `Actions` is available as `ActionData`.

Starting with version 2.16.0, two additional helper types are provided: `PageProps` defines `data: PageData`, as well as `form: ActionData`, when there are actions defined, while `LayoutProps` defines `data: LayoutData`, as well as `children: Snippet`.

> Legacy mode
> 
> Before 2.16.0:
> 
> Using Svelte 4:

> For this to work, your own `tsconfig.json` or `jsconfig.json` should extend from the generated `.svelte-kit/tsconfig.json` (where `.svelte-kit` is your [`outDir`](https://svelte.dev/docs/kit/configuration#outDir)):
> 
> `{ "extends": "./.svelte-kit/tsconfig.json" }`

### Default tsconfig.json[](https://svelte.dev/docs/kit/types#Generated-types-Default-tsconfig.json)

The generated `.svelte-kit/tsconfig.json` file contains a mixture of options. Some are generated programmatically based on your project configuration, and should generally not be overridden without good reason:

.svelte-kit/tsconfig

```bash
{
"compilerOptions": {
"paths": {
"$lib": ["../src/lib"],
"$lib/*": ["../src/lib/*"]
},
"rootDirs": ["..", "./types"]
},
"include": [
"ambient.d.ts",
"non-ambient.d.ts",
"./types/**/$types.d.ts",
"../vite.config.js",
"../vite.config.ts",
"../src/**/*.js",
"../src/**/*.ts",
"../src/**/*.svelte",
"../tests/**/*.js",
"../tests/**/*.ts",
"../tests/**/*.svelte"
],
"exclude": [
"../node_modules/**",
"../src/service-worker.js",
"../src/service-worker/**/*.js",
"../src/service-worker.ts",
"../src/service-worker/**/*.ts",
"../src/service-worker.d.ts",
"../src/service-worker/**/*.d.ts"
]
}
```

Others are required for SvelteKit to work properly, and should also be left untouched unless you know what you’re doing:

.svelte-kit/tsconfig

```json
{
"compilerOptions": {
// this ensures that types are explicitly
// imported with `import type`, which is
// necessary as Svelte/Vite cannot
// otherwise compile components correctly
"verbatimModuleSyntax": true,

// Vite compiles one TypeScript module
// at a time, rather than compiling
// the entire module graph
"isolatedModules": true,

// Tell TS it's used only for type-checking
"noEmit": true,

// This ensures both `vite build`
// and `svelte-package` work correctly
"lib": ["esnext", "DOM", "DOM.Iterable"],
"moduleResolution": "bundler",
"module": "esnext",
"target": "esnext"
}
}
```

Use the [`typescript.config` setting](https://svelte.dev/docs/kit/configuration#typescript) in `svelte.config.js` to extend or modify the generated `tsconfig.json`.

## $lib[](https://svelte.dev/docs/kit/types#$lib)

This is a simple alias to `src/lib`, or whatever directory is specified as [`config.kit.files.lib`](https://svelte.dev/docs/kit/configuration#files). It allows you to access common components and utility modules without `../../../../` nonsense.

### $lib/server[](https://svelte.dev/docs/kit/types#$lib-$lib-server)

A subdirectory of `$lib`. SvelteKit will prevent you from importing any modules in `$lib/server` into client-side code. See [server-only modules](https://svelte.dev/docs/kit/server-only-modules).

## app.d.ts[](https://svelte.dev/docs/kit/types#app.d.ts)

The `app.d.ts` file is home to the ambient types of your apps, i.e. types that are available without explicitly importing them.

Always part of this file is the `App` namespace. This namespace contains several types that influence the shape of certain SvelteKit features you interact with.

## Error[](https://svelte.dev/docs/kit/types#Error)

Defines the common shape of expected and unexpected errors. Expected errors are thrown using the `error` function. Unexpected errors are handled by the `handleError` hooks which should return this shape.

## Locals[](https://svelte.dev/docs/kit/types#Locals)

The interface that defines `event.locals`, which can be accessed in server [hooks](https://svelte.dev/docs/kit/hooks) (`handle`, and `handleError`), server-only `load` functions, and `+server.js` files.

## PageData[](https://svelte.dev/docs/kit/types#PageData)

Defines the common shape of the [page.data state](https://svelte.dev/docs/kit/$app-state#page) and [$page.data store](https://svelte.dev/docs/kit/$app-stores#page) - that is, the data that is shared between all pages. The `Load` and `ServerLoad` functions in `./$types` will be narrowed accordingly. Use optional properties for data that is only present on specific pages. Do not add an index signature (`[key: string]: any`).

## PageState[](https://svelte.dev/docs/kit/types#PageState)

The shape of the `page.state` object, which can be manipulated using the [`pushState`](https://svelte.dev/docs/kit/$app-navigation#pushState) and [`replaceState`](https://svelte.dev/docs/kit/$app-navigation#replaceState) functions from `$app/navigation`.

## Platform[](https://svelte.dev/docs/kit/types#Platform)

If your adapter provides [platform-specific context](https://svelte.dev/docs/kit/adapters#Platform-specific-context) via `event.platform`, you can specify it here.