# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`packageManager: pnpm@12.4.1`).

- `pnpm dev` — dev server (http://localhost:3000)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- No test runner is configured yet.

## Next.js version warning

`next` is 16.4.2 with React 19.3 — APIs differ from training data. Per [AGENTS.md](AGENTS.md), read the relevant guide in `node_modules/next/dist/docs/` (`01-app/` for the App Router) before writing Next.js code, and heed deprecation notices.

[next.config.ts](next.config.ts) enables non-default features: `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`. Cache Components changes how dynamic/cached data fetching works in the App Router, so check the docs before adding data access to pages/layouts.

## Architecture

Frontend-only UI ("nepav2-ui") for NEPA (Catholic university context; logos in `public/`). Source lives in `src/` and the `@/*` alias maps to `./src/*`.

- `src/app/` — App Router (`layout.tsx`, `globals.css`; there is no `page.tsx` yet, the template page was removed).
- `src/components/ui/` — shadcn/ui components, style `base-nova`, built on **`@base-ui/react`** (not Radix). Add/update them with the `shadcn` CLI; config in [components.json](components.json) (aliases: `@/components`, `@/lib/utils`, `@/hooks`).
- `src/lib/utils.ts` — `cn()` helper.

### Styling

- Tailwind CSS v4, CSS-first: no `tailwind.config`. Theme tokens (shadcn CSS variables, oklch) live in `src/app/globals.css` via `@theme inline`, with a `.dark` class variant.
- CSS is processed through Turbopack's `@tailwindcss/turbopack` loader rule configured in `next.config.ts`.
- [DESIGN.md](DESIGN.md) is the design-system spec (“NEPA Academic Experience”: color palette, typography, layout, component styling, co-branding emblems). Consult it when building UI; note `globals.css` still holds the default shadcn neutral palette, not yet the NEPA colors.

### Intended stack (installed, not yet wired up)

react-query + ky (data fetching), react-hook-form + zod (forms/validation), zustand (client state), next-themes, sonner (toasts), recharts, @tanstack/react-table.

## Conventions

- Commits: Conventional Commits in Portuguese, subject line only (no body, no co-author trailer).
