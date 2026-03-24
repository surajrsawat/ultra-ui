# Workflow Environment Setup

This repository uses one consolidated GitHub Actions workflow at `.github/workflows/pipeline.yml`.

The pipeline includes CI, CodeQL, Vercel deploy (preview/production), and package release jobs.

Deploy and release jobs are secret-gated: if required secrets are missing, those jobs are skipped with a clear summary note instead of failing hard.

## GitHub Environments

Create these environments in GitHub repository settings:

- `preview` for pull requests from `feature/*`
- `production` for pushes to `main`
- `release` for npm publishing from `main`

Recommended protection rules:

- `production`: require reviewers before deployment
- `release`: require reviewers before publishing packages
- `preview`: no approval required

## Required Secrets

### `preview` environment

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### `production` environment

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### `release` environment

- `NPM_TOKEN`

## Vercel Project Setup

1. Connect the repository to a Vercel project that builds [apps/showcase](apps/showcase).
2. In Vercel, configure `Preview` and `Production` environment variables for the showcase app.
3. Ensure the project uses the same build settings as [vercel.json](vercel.json).

## Token Creation

### `VERCEL_TOKEN`

1. Open Vercel account settings.
2. Create a token with access to the Ultra UI project.
3. Save the token into both `preview` and `production` GitHub environments.

### `NPM_TOKEN`

1. Log in to npm with access to the `@ultra-ui` scope.
2. Create an automation token.
3. Save it in the `release` GitHub environment.

## Validation Checklist

- Open a pull request from `feature/*` and confirm the `Ultra UI Pipeline` workflow runs CI and preview deploy (when preview secrets are present).
- Push to `main` and confirm production deploy runs (when production Vercel secrets are present).
- Push to `main` with release changes and confirm package publish runs (when `NPM_TOKEN` is present in `release` environment).