# Contributing To Ultra UI

Ultra UI is a pnpm workspace that publishes multiple packages under the `@ultra-ui` scope.

## Local Setup

```bash
pnpm install
pnpm dev:showcase
```

Useful commands:

```bash
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm build:packages
pnpm pack:check
```

## Working Agreement

1. Keep package boundaries explicit.
2. Prefer small, reviewable changesets over broad refactors.
3. Update docs and showcase examples when public behavior changes.
4. Add or update tests for exported behavior.

## Package Structure Convention

Ultra UI uses semantic grouping at the package level and one folder per exported unit.

Recommended structure:

```text
packages/<package>/src/<group>/<Unit>/
  <Unit>.ts or <Unit>.tsx
  <Unit>.test.ts or <Unit>.test.tsx
  index.ts
  types.ts
  utils.ts
  constants.ts
```

`types.ts`, `utils.ts`, and `constants.ts` are optional and should only exist when they carry meaningful local responsibility.

## Changesets And Releases

When a publishable package changes, add a changeset unless the change is strictly internal and does not affect published contents or behavior.

```bash
pnpm changeset
```

Release flow summary:

1. Merge approved changes into `main`.
2. GitHub Actions runs validation, coverage, scanning, deploy, and release jobs.
3. The release job uses Changesets to either open a version PR or publish to npm.

Environment details are documented in [docs/WORKFLOW_SETUP.md](docs/WORKFLOW_SETUP.md).

## Package Publishing Checks

Before changing exports, build output, or package contents, verify the workspace packages can be packed cleanly:

```bash
pnpm build:packages
pnpm pack:check
```

This catches accidental publication of source-only files, missing build output, or broken export assumptions.

## Pull Requests

Use the pull request template and include:

1. A clear summary of changed behavior.
2. The affected packages.
3. Validation commands and outcomes.
4. Risks, migration notes, or deployment implications.

If the work is part of the planned roadmap, reference [docs/spec.md](docs/spec.md) in the PR summary.