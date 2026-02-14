<!-- Copilot instructions for working on this Vite + React + TypeScript hotel UI project -->
# Repo summary

- Purpose: A small Vite + React + TypeScript frontend for a hotel/venue site (pages, room details, booking, gallery).
- Core stack: Vite (dev server), React 19, TypeScript, TailwindCSS, Radix UI primitives, Framer Motion for transitions, React Router v7.

# Big-picture architecture (how pieces fit)

- Entry: [src/main.tsx](src/main.tsx) mounts the app.
- Routing & layout: [src/App.tsx](src/App.tsx) defines routes and global wrappers (page transitions, scroll-to-top, loading screen).
- Pages: route components live in [src/pages](src/pages) (e.g. `Home`, `RoomDetail`, `Booking`). Add new pages here and wire the route in `App.tsx`.
- UI primitives: reusable UI wrappers and design-system components live in [src/components/ui](src/components/ui) (examples: `button.tsx`, `card.tsx`, `toast` wrappers). These often wrap Radix primitives.
- Shell components: `Navbar` and `Footer` are in [src/components](src/components). Place larger, page-specific components under `src/components` alongside pages if they are not reusable.
- Static/semi-static data: [src/data/hotelData.ts](src/data/hotelData.ts) holds sample/mock data used across pages.
- Utilities & hooks: small helpers in [src/lib/utils.ts](src/lib/utils.ts) and custom hooks in [src/hooks](src/hooks) (e.g. `use-mobile.ts`).
- Path alias: TS path alias `@/*` → `src/*` is defined in `tsconfig.json`; imports like `@/components/ui/sonner` map to `src/components/ui/sonner`.

# Developer workflows & exact commands

- Install deps: `npm install` (project uses `vite` + typical npm scripts in `package.json`).
- Dev server: `npm run dev` — starts Vite dev server (hot reload).
- Build: `npm run build` — runs `tsc -b` then `vite build`.
- Preview production build: `npm run preview`.
- Lint: `npm run lint` (ESLint config is at the repo root: `eslint.config.js`).

# Patterns & conventions (project-specific)

- Routing: add a component under `src/pages/` and register a `<Route>` in `src/App.tsx` using the `PageTransition` wrapper for consistent animations.
- UI components: follow the `ui/` pattern — create small, focused files (no large mixed files). Many components re-export Radix primitives with Tailwind classes and `class-variance-authority` variants.
- Styling: Tailwind utility classes are used throughout. Prefer composing small CSS utility classes over global styles; `tailwind.config.js` controls the theme.
- Data flow: pages typically import data from `src/data/*` or fetch and pass props down to presentational components — there is no global state manager present.
- Aliases: always use `@/...` imports for project modules to keep paths stable.

# Integration points & notable dependencies

- Radix UI wrappers: check `src/components/ui/*` for how accessibility primitives are wrapped and themed.
- Framer Motion: used for page and element animations in `src/App.tsx` and some components.
- Sonner (toast): used for notifications via `src/components/ui/sonner.tsx`.
- No server code in this repo: backend integrations should be mocked or called via fetch within pages; there is no centralized API client by default.

# When making changes an AI assistant should do first

1. Run `npm run dev` locally to verify visual/interaction changes.
2. Check `src/App.tsx` for routing impacts if adding/removing pages.
3. Look in `src/components/ui` for a matching primitive to extend before creating a new UI component.
4. Use `@/` imports when referencing project files.

# Files to inspect for examples

- Routing & transitions: [src/App.tsx](src/App.tsx)
- UI primitives: [src/components/ui/button.tsx](src/components/ui/button.tsx) (or similar files in that folder)
- Mock data: [src/data/hotelData.ts](src/data/hotelData.ts)
- Hooks & utils: [src/hooks/use-mobile.ts](src/hooks/use-mobile.ts), [src/lib/utils.ts](src/lib/utils.ts)

# Constraints & things *not* present

- There are no tests or test runner configured — do not assume a CI test job exists.
- No shared API client or environment variables pattern — add them explicitly if integrating remote APIs.

# Quick reminders for edits

- Keep component files small and focused; prefer new files in `src/components/ui` for reusable widgets.
- Preserve Tailwind + Radix patterns when composing accessible primitives.
- Update routes in `src/App.tsx` when adding pages.

---
If any area should be expanded (routing, build, or component conventions), tell me which section and I will update this file.
