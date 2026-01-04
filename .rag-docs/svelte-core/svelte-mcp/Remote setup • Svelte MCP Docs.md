The remote version of the MCP server is available at `https://mcp.svelte.dev/mcp`.

Here’s how to set it up in some common MCP clients:

## Claude Code[](https://svelte.dev/docs/mcp/remote-setup#Claude-Code)

To include the remote MCP version in Claude Code, simply run the following command:

```csharp
claude mcp add -t http -s [scope] svelte https://mcp.svelte.dev/mcp
```

You can choose your preferred `scope` (it must be `user`, `project` or `local`) and `name`.

## Claude Desktop[](https://svelte.dev/docs/mcp/remote-setup#Claude-Desktop)

-   Open Settings > Connectors
-   Click on Add Custom Connector
-   When prompted for a name, enter `svelte`
-   Under the Remote MCP server URL input, use `https://mcp.svelte.dev/mcp`
-   Click Add

## Codex CLI[](https://svelte.dev/docs/mcp/remote-setup#Codex-CLI)

Add the following to your `config.toml` (which defaults to `~/.codex/config.toml`, but refer to [the configuration documentation](https://github.com/openai/codex/blob/main/docs/config.md) for more advanced setups):

```ini
experimental_use_rmcp_client = true
[mcp_servers.svelte]
url = "https://mcp.svelte.dev/mcp"
```

## Gemini CLI[](https://svelte.dev/docs/mcp/remote-setup#Gemini-CLI)

To use the remote MCP server with Gemini CLI, simply run the following command:

```csharp
gemini mcp add -t http -s [scope] svelte https://mcp.svelte.dev/mcp
```

The `[scope]` must be `user` or `project`.

## OpenCode[](https://svelte.dev/docs/mcp/remote-setup#OpenCode)

Run the command:

and follow the instructions, selecting ‘Remote’ under the ‘Select MCP server type’ prompt:

```sql
opencode mcp add

┌  Add MCP server
│
◇  Enter MCP server name
│  svelte
│
◇  Select MCP server type
│  Remote
│
◇  Enter MCP server URL
│  https://mcp.svelte.dev/mcp
```

## VS Code[](https://svelte.dev/docs/mcp/remote-setup#VS-Code)

-   Open the command palette
-   Select “MCP: Add Server...”
-   Select “HTTP (HTTP or Server-Sent-Events)”
-   Insert `https://mcp.svelte.dev/mcp` in the input and press `Enter`
-   Insert your preferred name
-   Select if you want to add it as a `Global` or `Workspace` MCP server

## Cursor[](https://svelte.dev/docs/mcp/remote-setup#Cursor)

-   Open the command palette
-   Select “View: Open MCP Settings”
-   Click on “Add custom MCP”

It will open a file with your MCP servers where you can add the following configuration:

```json
{
"mcpServers": {
"svelte": {
"url": "https://mcp.svelte.dev/mcp"
}
}
}
```

## GitHub Coding Agent[](https://svelte.dev/docs/mcp/remote-setup#GitHub-Coding-Agent)

-   Open your repository in GitHub
-   Go to Settings
-   Open Copilot > Coding agent
-   Edit the MCP configuration

```json
{
"mcpServers": {
"svelte": {
"type": "http",
"url": "https://mcp.svelte.dev/mcp",
"tools": ["*"]
}
}
}
```

-   Click _Save MCP configuration_

## Other clients[](https://svelte.dev/docs/mcp/remote-setup#Other-clients)

If we didn’t include the MCP client you are using, refer to their documentation for `remote` servers and use `https://mcp.svelte.dev/mcp` as the URL.