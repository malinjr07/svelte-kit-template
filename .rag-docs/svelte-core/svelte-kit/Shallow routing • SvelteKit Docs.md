As you navigate around a SvelteKit app, you create _history entries_. Clicking the back and forward buttons traverses through this list of entries, re-running any `load` functions and replacing page components as necessary.

Sometimes, it’s useful to create history entries _without_ navigating. For example, you might want to show a modal dialog that the user can dismiss by navigating back. This is particularly valuable on mobile devices, where swipe gestures are often more natural than interacting directly with the UI. In these cases, a modal that is _not_ associated with a history entry can be a source of frustration, as a user may swipe backwards in an attempt to dismiss it and find themselves on the wrong page.

SvelteKit makes this possible with the [`pushState`](https://svelte.dev/docs/kit/$app-navigation#pushState) and [`replaceState`](https://svelte.dev/docs/kit/$app-navigation#replaceState) functions, which allow you to associate state with a history entry without navigating. For example, to implement a history-driven modal:

The modal can be dismissed by navigating back (unsetting `page.state.showModal`) or by interacting with it in a way that causes the `close` callback to run, which will navigate back programmatically.

## API[](https://svelte.dev/docs/kit/shallow-routing#API)

The first argument to `pushState` is the URL, relative to the current URL. To stay on the current URL, use `''`.

The second argument is the new page state, which can be accessed via the [page object](https://svelte.dev/docs/kit/$app-state#page) as `page.state`. You can make page state type-safe by declaring an [`App.PageState`](https://svelte.dev/docs/kit/types#PageState) interface (usually in `src/app.d.ts`).

To set page state without creating a new history entry, use `replaceState` instead of `pushState`.

> Legacy mode
> 
> `page.state` from `$app/state` was added in SvelteKit 2.12. If you’re using an earlier version or are using Svelte 4, use `$page.state` from `$app/stores` instead.

## Loading data for a route[](https://svelte.dev/docs/kit/shallow-routing#Loading-data-for-a-route)

When shallow routing, you may want to render another `+page.svelte` inside the current page. For example, clicking on a photo thumbnail could pop up the detail view without navigating to the photo page.

For this to work, you need to load the data that the `+page.svelte` expects. A convenient way to do this is to use [`preloadData`](https://svelte.dev/docs/kit/$app-navigation#preloadData) inside the `click` handler of an `<a>` element. If the element (or a parent) uses [`data-sveltekit-preload-data`](https://svelte.dev/docs/kit/link-options#data-sveltekit-preload-data), the data will have already been requested, and `preloadData` will reuse that request.

## Caveats[](https://svelte.dev/docs/kit/shallow-routing#Caveats)

During server-side rendering, `page.state` is always an empty object. The same is true for the first page the user lands on — if the user reloads the page (or returns from another document), state will _not_ be applied until they navigate.

Shallow routing is a feature that requires JavaScript to work. Be mindful when using it and try to think of sensible fallback behavior in case JavaScript isn’t available.