# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`packageManager: pnpm@12.4.1`).

- `pnpm dev` — dev server (http://localhost:3000)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- No test runner is configured yet.

If the dev server renders stale server-side code after edits (hydration mismatch showing old text, or `x is not a function` for a newly added export), restart `pnpm dev`; it is a Turbopack SSR cache issue, not a code bug.

## Next.js version warning

`next` is 16.4.2 with React 19.3 — APIs differ from training data. Per [AGENTS.md](AGENTS.md), read the relevant guide in `node_modules/next/dist/docs/` (`01-app/` for the App Router) before writing Next.js code, and heed deprecation notices.

[next.config.ts](next.config.ts) enables non-default features: `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`. With Cache Components, a client component that calls `useSearchParams()` must sit inside a `<Suspense>` boundary (see `mfa/page.tsx`, `activate-account/page.tsx`), and `Date`/random values can't be read in server components during prerender.

`next dev` rewrites [AGENTS.md](AGENTS.md) on its own (the `agentFeedback` block); that diff is not part of feature work and has been left uncommitted.

## Architecture

Frontend-only UI ("nepav2-ui") for NEPA, the extension and research center of Faculdade Católica da Paraíba. Source lives in `src/` and the `@/*` alias maps to `./src/*`. There is no backend yet: every auth action is mocked.

- `src/app/layout.tsx` — root layout: Plus Jakarta Sans (`--font-plus-jakarta`), `lang="pt-BR"`. `/` redirects to `/login`.
- `src/app/(auth)/` — route group with the shared split layout (`AuthShell`). Routes are in English: `/login`, `/register`, `/mfa`, `/forgot-password` → `/verify-code` → `/new-password`, `/activate-account`. `/portal` (post-login destination) does not exist yet.
- `src/components/auth/` — building blocks shared by all auth screens: `AuthShell`/`AuthAside` (layout), `CardHeader` (NEPA brand + optional `StepBadge`), `AuthHeading`, `TextField`, `PasswordField`, `SelectField`, `OtpField`, `CodeForm` (6-digit code form used by MFA and password recovery), `ResendCode`, `PasswordStrength`, `SubmitButton` (+ `submitButtonClass` for link-buttons), `BackLink`, `StatusIcon`.
- `src/components/ui/` — shadcn/ui components, style `base-nova`, built on **`@base-ui/react`** (not Radix). Add/update them with the `shadcn` CLI; config in [components.json](components.json). `input`, `input-group`, `select` and `input-otp` were edited to the DESIGN.md field spec (48px height, 1.5px border, `ring-4` focus halo), so re-adding them with the CLI overwrites those tweaks.
- `src/lib/utils.ts` — `cn()` (re-exported from the `cn` package, a clsx + tailwind-merge replacement).
- `src/lib/auth/` — `schemas.ts` (zod schemas and shared `passwordRules`), `mock.ts` (async fake API; hints for test values are in each function's comment: password `errada` fails login, code `123456` is valid, token `expired` simulates an expired activation link), `recovery-flow.ts` (sessionStorage-backed state and guards so recovery steps can't be skipped via URL), `format.ts` (`formatPhone`, `maskEmail`), `options.ts` (placeholder select options, to be replaced by real data).

### Forms

Forms are client components using react-hook-form + `zodResolver`, with fields built from `TextField`/`PasswordField`/`SelectField` and a `SubmitButton loading={isSubmitting}`. Use `useWatch` (not `watch`) for derived UI to keep the React Compiler lint clean. To swap the mock for a real API, replace the functions in `mock.ts` keeping their `Promise<AuthResult>` contract.

### Styling

- Tailwind CSS v4, CSS-first: no `tailwind.config`. Theme tokens live in `src/app/globals.css` (`:root` hex values, exposed through `@theme inline`); they already hold the NEPA palette (navy `--primary`, `--primary-hover`, `--success`, coral-ish `--destructive`, `--shadow-card`). The `.dark` block is still the untouched shadcn default and is unused.
- CSS is processed through Turbopack's `@tailwindcss/turbopack` loader rule configured in `next.config.ts`.
- [DESIGN.md](DESIGN.md) is the design-system spec. Auth screens follow it with these project decisions on top (validated with the user, don't reintroduce what was removed):
  - Split 50/50; only the right column scrolls on `lg+`. Left panel is fixed navy with the Católica crest, name, motto and © footer.
  - Right column has no card, no divider lines and no "support/help" section. The NEPA `CardHeader` sits right above the title; no Católica crest on mobile.
  - Keep the right column's scale compact (title `text-3xl`, inputs `h-12`, icons `size-4`) so the left panel stays the visual focus.
  - Image `width`/`height` must be the PNG's real dimensions (crest 336×338, NEPA 334×341) sized via classes with `h-auto`, or Next warns.
  - `input::-ms-reveal` is hidden in `globals.css` because `PasswordField` has its own toggle.

## Conventions

- Commits: Conventional Commits in Portuguese, subject line only (no body, no co-author trailer).
- `.notes/` is git-ignored scratch space for plans and design references (`.notes/references/screens/` holds the AI-generated mockups the auth screens were based on).
