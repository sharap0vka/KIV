# Contributing

## Local checks

- Install dependencies: `pnpm install`
- Run the full local quality gate before pushing: `pnpm quality:check`

## Git hooks

- `pre-commit` runs `lint-staged` and `pnpm typecheck`.
- `pre-push` runs project smoke checks.

## Licensing

- Source code is licensed under `MIT` (see `LICENSE`).
- Content is licensed under `CC BY 4.0` (see `LICENSE-CONTENT`).
