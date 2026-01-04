[Svelte MCP](https://svelte.dev/docs/mcp/overview) can help your LLM write better Svelte code.

## Usage[](https://svelte.dev/docs/cli/mcp#Usage)

```csharp
npx sv add mcp
```

## What you get[](https://svelte.dev/docs/cli/mcp#What-you-get)

-   An MCP configuration for [local](https://svelte.dev/docs/mcp/local-setup) or [remote](https://svelte.dev/docs/mcp/remote-setup) setup
-   A [README for agents](https://agents.md/) to help you use the MCP server effectively

## Options[](https://svelte.dev/docs/cli/mcp#Options)

### ide[](https://svelte.dev/docs/cli/mcp#Options-ide)

The IDE you want to use like `'claude-code'`, `'cursor'`, `'gemini'`, `'opencode'`, `'vscode'`, `'other'`.

```csharp
npx sv add mcp="ide:cursor,vscode"
```

### setup[](https://svelte.dev/docs/cli/mcp#Options-setup)

The setup you want to use.

```csharp
npx sv add mcp="setup:local"
```