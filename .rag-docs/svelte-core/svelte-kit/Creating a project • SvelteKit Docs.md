The easiest way to start building a SvelteKit app is to run `npx sv create`:

```perl
npx sv create my-app
cd my-app
npm run dev
```

The first command will scaffold a new project in the `my-app` directory asking if you’d like to set up some basic tooling such as TypeScript. See [the CLI docs](https://svelte.dev/docs/cli/overview) for information about these options and [the integrations page](https://svelte.dev/docs/kit/integrations) for pointers on setting up additional tooling. `npm run dev` will then start the development server on [localhost:5173](http://localhost:5173/) - make sure you install dependencies before running this if you didn’t do so during project creation.

There are two basic concepts:

-   Each page of your app is a [Svelte](https://svelte.dev/docs/svelte) component
-   You create pages by adding files to the `src/routes` directory of your project. These will be server-rendered so that a user’s first visit to your app is as fast as possible, then a client-side app takes over

Try editing the files to get a feel for how everything works.

## Editor setup[](https://svelte.dev/docs/kit/creating-a-project#Editor-setup)

We recommend using [Visual Studio Code (aka VS Code)](https://code.visualstudio.com/download) with [the Svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode), but [support also exists for numerous other editors](https://sveltesociety.dev/collection/editor-support-c85c080efc292a34).