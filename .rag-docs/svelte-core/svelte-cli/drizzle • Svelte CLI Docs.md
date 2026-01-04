[Drizzle ORM](https://orm.drizzle.team/) is a TypeScript ORM offering both relational and SQL-like query APIs, and which is serverless-ready by design.

## Usage[](https://svelte.dev/docs/cli/drizzle#Usage)

## What you get[](https://svelte.dev/docs/cli/drizzle#What-you-get)

-   a setup that keeps your database access in SvelteKit’s server files
-   an `.env` file to store your credentials
-   compatibility with the Lucia auth add-on
-   an optional Docker configuration to help with running a local database

## Options[](https://svelte.dev/docs/cli/drizzle#Options)

### database[](https://svelte.dev/docs/cli/drizzle#Options-database)

Which database variant to use:

-   `postgresql` — the most popular open source database
-   `mysql` — another popular open source database
-   `sqlite` — file-based database not requiring a database server

```csharp
npx sv add drizzle="database:postgresql"
```

### client[](https://svelte.dev/docs/cli/drizzle#Options-client)

The SQL client to use, depends on `database`:

-   For `postgresql`: `postgres.js`, `neon`,
-   For `mysql`: `mysql2`, `planetscale`
-   For `sqlite`: `better-sqlite3`, `libsql`, `turso`

```csharp
npx sv add drizzle="database:postgresql+client:postgres.js"
```

Drizzle is compatible with well over a dozen database drivers. We just offer a few of the most common ones here for simplicity, but if you’d like to use another one you can choose one as a placeholder and swap it out for another after setup by choosing from [Drizzle’s full list of compatible drivers](https://orm.drizzle.team/docs/connect-overview#next-steps).

### docker[](https://svelte.dev/docs/cli/drizzle#Options-docker)

Whether to add Docker Compose configuration. Only available for [`database`](https://svelte.dev/docs/cli/drizzle#Options-database) `postgresql` or `mysql`

```csharp
npx sv add drizzle="database:postgresql+client:postgres.js+docker:yes"
```