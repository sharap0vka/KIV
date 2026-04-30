# AGENTS

> Этот файл автогенерируется скриптом `scripts/context/generate-context-docs.mjs`.
> Ручные правки будут перезаписаны.

## Язык и стиль
- Отвечай пользователю по-русски.
- При изменениях кода сначала запускать точечные проверки, затем `pnpm quality:check` при необходимости полного прогона.

## Профиль проекта
- Тип: контентный сайт на `Next.js 15` + `React 19` + `TypeScript`.
- Контент-слой: `Velite` (схемы в `src/content/schemas`, артефакты в `.velite/`).
- Основные разделы: articles, concepts, tags, trends.

## Команды разработки
- `pnpm build`
- `pnpm dev`
- `pnpm docs:sync-context`
- `pnpm format`
- `pnpm format:check`
- `pnpm lint`
- `pnpm prepare`
- `pnpm quality:check`
- `pnpm smoke:all`
- `pnpm smoke:config`
- `pnpm smoke:run`
- `pnpm smoke:structure`
- `pnpm start`
- `pnpm test`
- `pnpm test:watch`
- `pnpm typecheck`

## Важные директории
- `src/`
- `content/`
- `scripts/`
- `tests/`
- `public/`

## Ключевые файлы
- `PRD.md`
- `DESIGN.md`
- `velite.config.ts`
- `biome.json`
- `vitest.config.ts`

## Автообновление контекста
- `AGENTS.MD` и `CONTEXT.md` обновляются автоматически через Cursor hooks: `.cursor/hooks.json`.
- Точка генерации: `scripts/context/generate-context-docs.mjs`.
- Ручной запуск: `pnpm docs:sync-context`.
