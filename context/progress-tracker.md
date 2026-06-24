# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Authentication wiring

## Current Goal

- Implement `context/feature-specs/03-auth.md`: Clerk provider, auth pages, route protection via `proxy.ts`, and root redirect — complete.

## Completed

- Design system and UI primitive components (01-design-system.md): shadcn/ui initialized, Button/Card/Dialog/Input/Tabs/Textarea/ScrollArea added, lucide-react installed, `lib/utils.ts` `cn()` helper created, `app/globals.css` rewritten with dark-only theme tokens matching `ui-context.md` (bg-base, bg-surface, text-copy-*, border-surface-border, text-brand, bg-accent-dim, etc.), light-mode `.dark` variant removed.
- Editor chrome shell (02-editor.md): `components/editor/editor-navbar.tsx` — fixed-height navbar with left/center/right sections, sidebar toggle using `PanelLeftOpen`/`PanelLeftClose`, dark background with bottom border. `components/editor/project-sidebar.tsx` — floating overlay sidebar (does not push content), slides in from the left via `translate-x`, `isOpen`/`onClose` props, header with title + close button, shadcn `Tabs` (My Projects / Shared) with empty placeholder states, full-width `New Project` button with `Plus` icon. Verified existing `components/ui/dialog.tsx` already supports title/description/footer composition — no new dialog component built, per spec ("do not build actual dialogs yet"). Typecheck and lint pass clean.
- Auth wiring (03-auth.md): installed `@clerk/ui`; `proxy.ts` at project root uses `clerkMiddleware` + `createRouteMatcher` to protect every route except `NEXT_PUBLIC_CLERK_SIGN_IN_URL`/`NEXT_PUBLIC_CLERK_SIGN_UP_URL` (added to `.env.local` as `/sign-in` and `/sign-up` — these vars did not previously exist). `app/layout.tsx` wraps the app in `ClerkProvider` with `@clerk/ui/themes` `dark` theme spread, overriding `variables` with the app's CSS custom properties (no hardcoded colors). `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` render Clerk's `SignIn`/`SignUp` inside a shared `components/auth/auth-layout.tsx` two-panel layout (left: logo/tagline/text feature list, hidden below `lg`; right: centered form). `app/page.tsx` is now a server component that redirects to `/editor` if authenticated, else `/sign-in`. `UserButton` added to `EditorNavbar`'s right section. `npm run build` and `npm run lint` pass clean.

- `app/editor/page.tsx`: client component hosting `EditorNavbar` + `ProjectSidebar`, owns `isSidebarOpen` state and wires the toggle/close callbacks between them. Content area below the navbar is currently an empty placeholder — no canvas yet. `/` now resolves end to end for authenticated users. Typecheck, lint, and build pass clean.
- Project dialogs (04-project-dialogs.md): `types/project.ts` defines `Project` and mock `MOCK_PROJECTS`/`MOCK_SHARED_PROJECTS`; `lib/utils.ts` adds `slugify()`. `hooks/use-project-dialogs.ts` centralizes dialog/form/loading state (`dialog`, `activeProject`, `name`, derived `slug`, `isSubmitting`) with open/close/submit handlers (submits are mocked with a timeout — no API calls). `components/editor/dialogs/{create,rename,delete}-project-dialog.tsx` built on the existing `components/ui/dialog.tsx` primitives: Create has a live slug preview under the name input, Rename auto-focuses and prefills the name with the current project shown in the description, Delete is confirm-only with `variant="destructive"`. `app/editor/page.tsx` now renders the empty-state center content (heading, description, `New Project` button) and all three dialogs wired to the hook. `components/editor/project-sidebar.tsx` renders `MOCK_PROJECTS`/`MOCK_SHARED_PROJECTS` as list items with hover-revealed rename/delete icon buttons shown only when `project.isOwner` is true, plus a mobile-only (`lg:hidden`) backdrop scrim that closes the sidebar on tap. Typecheck, lint, and build pass clean.

## In Progress

- None yet.

## Next Up

- Build the real canvas surface (Liveblocks + React Flow) to replace the placeholder content area in `app/editor/page.tsx`.
- Wire project dialogs to real API/persistence once backend exists.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Session Notes

- Add context needed to resume work in the next session.
