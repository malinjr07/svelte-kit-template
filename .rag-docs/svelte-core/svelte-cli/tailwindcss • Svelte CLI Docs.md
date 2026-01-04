CLIAdd-ons

[Tailwind CSS](https://tailwindcss.com/) allows you to rapidly build modern websites without ever leaving your HTML.

## Usage[](https://svelte.dev/docs/cli/tailwind#Usage)

```csharp
npx sv add tailwindcss
```

## What you get[](https://svelte.dev/docs/cli/tailwind#What-you-get)

-   Tailwind setup following the [Tailwind for SvelteKit guide](https://tailwindcss.com/docs/installation/framework-guides/sveltekit)
-   Tailwind Vite plugin
-   updated `layout.css` and `+layout.svelte` (for SvelteKit) or `app.css` and `App.svelte` (for non-SvelteKit Vite apps)
-   integration with `prettier` if using that package

## Options[](https://svelte.dev/docs/cli/tailwind#Options)

### plugins[](https://svelte.dev/docs/cli/tailwind#Options-plugins)

Which plugin to use:

-   `typography` — [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography)
-   `forms` — [`@tailwindcss/forms`](https://github.com/tailwindlabs/tailwindcss-forms)

```csharp
npx sv add tailwindcss="plugins:typography"
```

[Edit this page on GitHub](https://github.com/sveltejs/cli/edit/main/documentation/docs/30-add-ons/50-tailwind.md) [llms.txt](https://svelte.dev/docs/cli/tailwind/llms.txt)

previous next

[sveltekit-adapter](https://svelte.dev/docs/cli/sveltekit-adapter)

[vitest](https://svelte.dev/docs/cli/vitest)