`sv create` sets up a new SvelteKit project, with options to [setup additional functionality](https://svelte.dev/docs/cli/sv-add#Official-add-ons).

## Usage[](https://svelte.dev/docs/cli/sv-create#Usage)

```css
npx sv create [options] [path]
```

## Options[](https://svelte.dev/docs/cli/sv-create#Options)

### \--from-playground <url>[](https://svelte.dev/docs/cli/sv-create#Options-from-playground-url)

Create a SvelteKit project from a [playground](https://svelte.dev/playground) URL. This downloads all playground files, detects external dependencies, and sets up a complete SvelteKit project structure with everything ready to go.

Example:

```csharp
npx sv create --from-playground="https://svelte.dev/playground/hello-world"
```

### \--template <name>[](https://svelte.dev/docs/cli/sv-create#Options-template-name)

Which project template to use:

-   `minimal` — barebones scaffolding for your new app
-   `demo` — showcase app with a word guessing game that works without JavaScript
-   `library` — template for a Svelte library, set up with `svelte-package`

### \--types <option>[](https://svelte.dev/docs/cli/sv-create#Options-types-option)

Whether and how to add typechecking to the project:

-   `ts` — default to `.ts` files and use `lang="ts"` for `.svelte` components
-   `jsdoc` — use [JSDoc syntax](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for types

### \--no-types[](https://svelte.dev/docs/cli/sv-create#Options-no-types)

Prevent typechecking from being added. Not recommended!

### \--add \[add-ons...\][](https://svelte.dev/docs/cli/sv-create#Options-add-add-ons)

Add add-ons to the project in the `create` command. Following the same format as [sv add](https://svelte.dev/docs/cli/sv-add#Usage).

Example:

```css
npx sv create --add eslint prettier [path]
```

### \--no-add-ons[](https://svelte.dev/docs/cli/sv-create#Options-no-add-ons)

Run the command without the interactive add-ons prompt

### \--install <package-manager>[](https://svelte.dev/docs/cli/sv-create#Options-install-package-manager)

Installs dependencies with a specified package manager:

-   `npm`
-   `pnpm`
-   `yarn`
-   `bun`
-   `deno`

### \--no-install[](https://svelte.dev/docs/cli/sv-create#Options-no-install)

Prevents installing dependencies.

### \--no-dir-check[](https://svelte.dev/docs/cli/sv-create#Options-no-dir-check)

Skip checking whether the target directory is empty.