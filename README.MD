# site2026

Контентный сайт на `Next.js 15` + `React 19` + `TypeScript`.

## Команды

- `pnpm dev` — запуск dev-сервера
- `pnpm build` — production-сборка
- `pnpm start` — запуск production-сборки
- `pnpm test` — запуск тестов (Vitest)
- `pnpm test:watch` — тесты в watch-режиме
- `pnpm lint` — проверка кода через Biome
- `pnpm format` — автоформатирование через Biome
- `pnpm format:check` — проверка форматирования
- `pnpm typecheck` — проверка типов TypeScript
- `pnpm quality:check` — полный quality-прогон (lint + format + typecheck + test)
- `pnpm smoke:structure` — smoke-проверка структуры
- `pnpm smoke:config` — smoke-проверка конфигов
- `pnpm smoke:run` — smoke-прогон запуска
- `pnpm smoke:all` — все smoke-проверки
- `pnpm docs:sync-context` — обновление `AGENTS.MD` и `CONTEXT.md`

## Документация контекста

- `AGENTS.MD` и `CONTEXT.md` генерируются скриптом `scripts/context/generate-context-docs.mjs`.
- Для ручного обновления используйте `pnpm docs:sync-context`.
