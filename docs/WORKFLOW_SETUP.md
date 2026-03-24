# Workflow Environment Setup

This repository uses one consolidated GitHub Actions workflow at `.github/workflows/pipeline.yml`.

The pipeline includes CI, CodeQL, Vercel deploy (preview/dev/test/production), and package release jobs.

When code is merged into `main`, the same pipeline triggers the main-branch deploy flow:

- `deploy_dev` (Vercel dev deploy)
- `deploy_test` (Vercel test deploy)
- `deploy_production` (Vercel production deploy)
- `release_packages` (Changesets publish flow)
- `main_deploy_gate` (post-merge completion gate)

Deploy and release jobs are secret-gated: if required secrets are missing, those jobs are skipped with a clear summary note instead of failing hard.

## Branch Deployment Policy

- `main` can deploy to `dev`, `test`, and `production`.
- `feature/*` branches can deploy to `dev` and `test`.
- Pull requests to `main` can still run preview deployment checks through the `preview` environment.

## GitHub Environments

Create these environments in GitHub repository settings:

- `preview` for pull requests to `main`
- `dev` for push deployments from `main` and `feature/*`
- `test` for push deployments from `main` and `feature/*`
- `production` for pushes to `main`
- `release` for npm publishing from `main`

Recommended protection rules:

- `production`: require reviewers before deployment
- `release`: require reviewers before publishing packages
- `preview`: no approval required
- `dev`: no approval required
- `test`: optional reviewer approval if you want a manual test gate

## Required Checks For PR Merge

To make checks required before merging into `main`, configure branch protection on `main`:

1. Open repository settings -> Branches -> Add branch protection rule.
2. Branch name pattern: `main`.
3. Enable `Require status checks to pass before merging`.
4. Select these checks:
	- `validate`
	- `test_case_check`
	- `codeql`
	- `deploy_preview`
	- `pr_merge_gate`
5. Optionally enable `Require branches to be up to date before merging`.

`test_case_check` adds a PR-visible test quality report with:

- overall Vitest pass/fail status
- coverage percentages for lines, branches, functions, and statements
- code duplication percentage
- a failing-test table with file name, file path, and failing test case names

If you prefer one required check instead of multiple, requiring only `pr_merge_gate` is sufficient because it depends on all PR checks, including `test_case_check`.

## Required Secrets

### `preview` environment

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### `production` environment

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### `dev` environment

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### `test` environment

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### `release` environment

- `NPM_TOKEN`

## Vercel Project Setup

1. Connect the repository to Vercel project(s) that build [apps/showcase](apps/showcase).
2. Configure Vercel so `dev` and `test` GitHub environments point to the appropriate non-production project/domain setup.
3. Configure `Preview` and `Production` environment variables in the relevant Vercel project(s).
4. Ensure the project(s) use the same build settings as [vercel.json](vercel.json).

Recommended mapping:

- `preview` GitHub environment -> PR preview deployment
- `dev` GitHub environment -> dev Vercel project or dev domain
- `test` GitHub environment -> test/staging Vercel project or test domain
- `production` GitHub environment -> production Vercel project/domain

## Token Creation

### `VERCEL_TOKEN`

1. Open Vercel account settings.
2. Create a token with access to the Ultra UI project.
3. Save the token into `preview`, `dev`, `test`, and `production` GitHub environments as needed.

### `NPM_TOKEN`

1. Log in to npm with access to the `@ultra-ui` scope.
2. Create an automation token.
3. Save it in the `release` GitHub environment.

## Validation Checklist

- Open a pull request to `main` and confirm the `Ultra UI Pipeline` workflow runs CI and preview deploy (when preview secrets are present).
- Confirm the `test_case_check` job publishes the PR test summary with coverage, duplication, and any failing-test rows.
- Push a `feature/*` branch and confirm `dev` and `test` deploy jobs run (when those environment secrets are present).
- Push to `main` and confirm `dev`, `test`, and `production` deploy jobs run (when those Vercel secrets are present).
- Push to `main` with release changes and confirm package publish runs (when `NPM_TOKEN` is present in `release` environment).