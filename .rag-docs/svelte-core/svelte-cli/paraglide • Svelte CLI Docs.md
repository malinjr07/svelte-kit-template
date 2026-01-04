[Paraglide from Inlang](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) is a compiler-based i18n library that emits tree-shakable message functions with small bundle sizes, no async waterfalls, full type-safety, and more.

## Usage[](https://svelte.dev/docs/cli/paraglide#Usage)

## What you get[](https://svelte.dev/docs/cli/paraglide#What-you-get)

-   Inlang project settings
-   paraglide Vite plugin
-   SvelteKit `reroute` and `handle` hooks
-   `text-direction` and `lang` attributes in `app.html`
-   updated `.gitignore`
-   an optional demo page showing how to use paraglide

## Options[](https://svelte.dev/docs/cli/paraglide#Options)

### languageTags[](https://svelte.dev/docs/cli/paraglide#Options-languageTags)

The languages you’d like to support specified as IETF BCP 47 language tags.

```csharp
npx sv add paraglide="languageTags:en,es"
```

### demo[](https://svelte.dev/docs/cli/paraglide#Options-demo)

Whether to generate an optional demo page showing how to use paraglide.

```csharp
npx sv add paraglide="demo:yes"
```