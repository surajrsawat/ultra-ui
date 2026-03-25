# Ultra UI Specification

This document is the shared planning baseline for future implementation sessions.

## Objectives

1. Publish Ultra UI as an open-source npm monorepo under the `@ultra-ui` scope.
2. Normalize package structure so exported units are easier to discover, test, and maintain.
3. Expand the library in a staged way across headless hooks, grid-core foundations, and a dedicated data-grid package.
4. Keep CI, security scanning, environment deployments, and release automation stable while the API surface grows.

## Current Package Model

- `@ultra-ui/primitives`: presentational and interactive React UI components.
- `@ultra-ui/headless`: reusable state hooks and interaction logic.
- `@ultra-ui/grid-core`: low-level row, column, and grid-state foundations.
- `@ultra-ui/tailwind-wrappers`: Tailwind-first wrappers built on top of the core packages.
- `@ultra-ui/data-grid`: planned package for advanced table and data-grid capabilities.

## Package Boundary Decisions

### Recommended Boundaries

1. Keep general-purpose layout components in `@ultra-ui/primitives` unless grid-core intentionally becomes a broader layout engine.
2. Keep reusable interaction and state logic in `@ultra-ui/headless`.
3. Keep row, column, selection, sorting, and grid-specific foundations in `@ultra-ui/grid-core`.
4. Build `@ultra-ui/data-grid` on top of headless hooks plus grid-core models instead of embedding feature logic directly in UI components.

### Current Recommendation

Use `@ultra-ui/grid-core` for table and grid mechanics, not as the primary home for all layout primitives. This reduces API overlap with `@ultra-ui/primitives`.

## Structural Convention

All exported units should converge on a consistent folder contract.

```text
packages/<package>/src/<group>/<Unit>/
  <Unit>.ts or <Unit>.tsx
  <Unit>.test.ts or <Unit>.test.tsx
  index.ts
  types.ts
  utils.ts
  constants.ts
```

### Notes

1. Keep semantic category folders where they improve discoverability.
2. Do not add extra nesting unless the component or hook has real internal subparts.
3. Colocate tests with the exported unit.
4. Keep local `index.ts` files as the only public entry within a unit folder.

## Delivery Phases

### Phase 1: Open-Source Release Hardening

Scope:

1. Tighten npm package contents and export contracts.
2. Ensure README, contributing guidance, PR expectations, and release checks are in place.
3. Preserve the current GitHub Actions environment model for `preview`, `dev`, `test`, `production`, and `release`.

Acceptance criteria:

1. All publishable packages can be packed cleanly with intended contents only.
2. Release docs explain how changesets and environment secrets work.
3. PRs have a consistent checklist for package-impacting changes.

### Phase 2: Structural Normalization

Scope:

1. Align `grid-core` and `tailwind-wrappers` with the per-unit folder convention.
2. Normalize missing `types.ts` or local index patterns across headless hooks.
3. Keep public exports stable while internal organization improves.

Acceptance criteria:

1. Every exported unit has a predictable folder shape.
2. Existing package entry points remain intact unless a deliberate breaking change is planned.
3. Tests remain colocated and discoverable.

### Phase 3: Headless Expansion

Priority hooks:

1. Column filtering
2. Column sorting
3. Column visibility
4. Editable cell state
5. Row selection and bulk action state
6. Toolbar and table action state

Acceptance criteria:

1. New hooks are reusable outside the data-grid package.
2. Hooks do not depend on presentational markup.
3. Each hook has tests covering controlled and uncontrolled usage where applicable.

### Phase 4: Grid-Core Expansion

Candidate scope:

1. Extend the current grid row and column model.
2. Add sorting and pagination composition.
3. Add lower-level helpers that the future data-grid package can consume.
4. Revisit whether layout primitives such as `Flex`, `Stack`, `Spacer`, and `Divider` belong here or stay in `primitives`.

Acceptance criteria:

1. Grid-core exposes reusable non-visual mechanics.
2. Public types cover the table foundation needed by the data-grid package.
3. Showcase examples validate the API shape before broadening it further.

### Phase 5: Data-Grid Package

First milestone:

1. Base table rendering
2. Search
3. Sort
4. Pagination
5. Column hide and show
6. Row actions
7. Table actions
8. CSV export or similar basic download support

Second milestone:

1. Side filters
2. Editable cells with input-type-aware editors
3. Column ordering
4. Upload or import flows
5. Advanced filter operators

Acceptance criteria:

1. `@ultra-ui/data-grid` is a dedicated package.
2. The first milestone is demonstrated in the showcase app.
3. Advanced features are staged separately to keep the first release tractable.

## Workflow And Environment Model

The current baseline is a single GitHub Actions pipeline with:

1. validation
2. test coverage reporting
3. CodeQL scanning
4. preview deploys for pull requests
5. dev and test deploys for `feature/*` and `main`
6. production deploys for `main`
7. release automation for `main`

Vercel environments are constrained by Vercel's `development`, `preview`, and `production` environment model. `dev` and `test` should continue to map through GitHub environments and separate Vercel targets, domains, or project configuration as needed.

## Validation Commands

Use these commands as the minimum local validation baseline:

```bash
pnpm typecheck
pnpm test
pnpm build:packages
pnpm pack:check
```

Add `pnpm test:coverage` when touching core behavior or CI-sensitive changes.

## Session Use

At the start of future implementation sessions:

1. Review this document.
2. Identify the current phase and target milestone.
3. Keep changes scoped to one vertical slice whenever possible.
4. Update this file when a boundary or milestone decision changes.