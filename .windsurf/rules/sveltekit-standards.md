# SvelteKit Project Standards

**Activation Mode:** Always On

**Priority:** High

## General Protocols

### Client-Side Only Project
- **Context:** This is a **Client-Side Only** SvelteKit project managed with Firebase.
- **Server Code:** Do NOT write any server-side code. Ensure `ssr = false` in root layout
- **Documentation:** Before making changes, check `./rag-docs/` for official documentation of each library/package or existing markdown conversation logs

## Package Manager

- **Core Tool:** `yarn`
- **Installation:** `yarn add <package>` (or `yarn add -D <package>` for dev dependencies)
- **Scripts:** Use `yarn build`, `yarn dev`, etc.

## Import Aliases & Paths

**Strictly use the following aliases defined in `svelte.config.js`. Do not use relative paths (like `../../`) when an alias is available.**

| Alias         | Path                        | Description                     |
| :------------ | :-------------------------- | :------------------------------ |
| `@components` | `src/lib/components`        | General components              |
| `@common`     | `src/lib/components/common` | Common shared components        |
| `@ui`         | `src/lib/components/ui`     | Shadcn/UI components            |
| `@core`       | `src/lib/components/core`   | Core logic components           |
| `@svg`        | `src/lib/components/svg`    | SVG assets/icons                |
| `@services`   | `src/lib/utils/services`    | Service layers (Firebase, etc.) |
| `@utils`      | `src/lib/utils`             | General utilities               |
| `@store`      | `src/lib/utils/store`       | State management stores         |
| `@types`      | `src/lib/utils/types`       | TypeScript type definitions     |
| `@hooks`      | `src/lib/utils/hooks`       | Svelte actions/hooks            |

**Rule:** When importing, use the keyword alias.
_Example_: `import Button from '@ui/button/button.svelte';`

## Coding Standards

### Svelte 5 & Reactivity

- **Derived State:** Use `$derived(...)` for values that depend on props to avoid "captures initial value" warnings.
  - _Incorrect_: `const double = count * 2;` (if `count` is a prop)
  - _Correct_: `let double = $derived(count * 2);`
- **Effect Synchronization:** Use `$effect` to sync state if absolutely necessary, but prefer derived state.
- **Untracked Access:** Use `untrack(() => ...)` when you explicitly need to read a reactive value without creating a dependency (e.g., initializing state).

### Styling & UI

- **Framework:** Shadcn Svelte with Tailwind CSS.

### Environment Variables

- **Prefix:** `PUBLIC_` (e.g., `PUBLIC_API_KEY`).
- **Access:** Import from `$env/static/public`.

## Implementation Guidelines

### File Structure
- Follow the established directory structure under `src/lib/`
- Keep components in their designated folders based on the alias system
- Maintain consistency with existing naming conventions

### Code Quality
- Use TypeScript for type safety
- Use `type` keyword for type definitions, not the `interface` keyword.
- Follow existing code patterns and conventions
- Ensure all imports use the proper aliases
- Test components thoroughly before implementation

### Firebase Integration
- Use the `@services` directory for Firebase or API related code
- Keep Firebase configurations, API keys, etc. in environment variables

## Examples

**Correct Import:**
```typescript
import Button from '@ui/button/button.svelte';
import { auth } from '@services/firebase';
import { userStore } from '@store/auth';
```

**Incorrect Import:**
```typescript
import Button from '../../lib/components/ui/button/button.svelte';
import { auth } from '../utils/services/firebase';
```

**Correct Reactivity:**
```typescript
let doubled = $derived(count * 2);
```

**Incorrect Reactivity:**
```typescript
let doubled = count * 2; // Will capture initial value only
```
