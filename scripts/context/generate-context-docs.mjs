import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const AGENTS_PATH = path.join(ROOT, "AGENTS.MD");
const CONTEXT_PATH = path.join(ROOT, "CONTEXT.md");
const PACKAGE_JSON_PATH = path.join(ROOT, "package.json");

const TOP_LEVEL_DIRS = ["src", "content", "scripts", "tests", "public"];
const KEY_FILES = ["PRD.md", "DESIGN.md", "velite.config.ts", "biome.json", "vitest.config.ts"];

async function readJson(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function safeExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listChildren(relativeDir) {
  const absoluteDir = path.join(ROOT, relativeDir);
  if (!(await safeExists(absoluteDir))) {
    return [];
  }

  const entries = await readdir(absoluteDir, { withFileTypes: true });
  return entries
    .filter((entry) => !entry.name.startsWith("."))
    .map((entry) => ({
      name: entry.name,
      type: entry.isDirectory() ? "dir" : "file",
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function renderList(items) {
  if (items.length === 0) {
    return "- (пусто)";
  }

  return items.map((item) => `- \`${item}\``).join("\n");
}

function buildAgentsMd(context) {
  return `# AGENTS

> Этот файл автогенерируется скриптом \`scripts/context/generate-context-docs.mjs\`.
> Ручные правки будут перезаписаны.

## Язык и стиль
- Отвечай пользователю по-русски.
- При изменениях кода сначала запускать точечные проверки, затем \`pnpm quality:check\` при необходимости полного прогона.

## Профиль проекта
- Тип: контентный сайт на \`Next.js 15\` + \`React 19\` + \`TypeScript\`.
- Контент-слой: \`Velite\` (схемы в \`src/content/schemas\`, артефакты в \`.velite/\`).
- Основные разделы: articles, concepts, tags, trends.

## Команды разработки
${renderList(context.scripts.map((script) => `pnpm ${script}`))}

## Важные директории
${renderList(context.topDirs)}

## Ключевые файлы
${renderList(context.keyFiles)}

## Автообновление контекста
- \`AGENTS.MD\` и \`CONTEXT.md\` обновляются автоматически через Cursor hooks: \`.cursor/hooks.json\`.
- Точка генерации: \`scripts/context/generate-context-docs.mjs\`.
- Ручной запуск: \`pnpm docs:sync-context\`.
`;
}

function buildContextMd(context) {
  return `# CONTEXT

> Автогенерируемый снимок проекта. Обновлено: ${context.generatedAt}

## Технологии
- \`next\`: ${context.dependencies.next ?? "n/a"}
- \`react\`: ${context.dependencies.react ?? "n/a"}
- \`typescript\`: ${context.devDependencies.typescript ?? "n/a"}
- \`velite\`: ${context.devDependencies.velite ?? "n/a"}
- Пакетный менеджер: \`${context.packageManager}\`

## Скрипты package.json
${renderList(context.scripts.map((name) => `${name}: ${context.scriptMap[name]}`))}

## Топ-уровень репозитория
${renderList(context.rootEntries)}

## Срез основных папок
${context.directorySnapshots
  .map((snapshot) => {
    const header = `### \`${snapshot.dir}/\``;
    const lines = snapshot.children.map((item) => {
      const suffix = item.type === "dir" ? "/" : "";
      return `- \`${item.name}${suffix}\``;
    });
    return [header, ...(lines.length > 0 ? lines : ["- (пусто)"])].join("\n");
  })
  .join("\n\n")}

## Контент trends
${renderList(context.trendsFiles)}
`;
}

async function main() {
  const pkg = await readJson(PACKAGE_JSON_PATH);

  const rootEntries = (await readdir(ROOT, { withFileTypes: true }))
    .filter((entry) => !entry.name.startsWith("."))
    .map((entry) => `${entry.name}${entry.isDirectory() ? "/" : ""}`)
    .sort((left, right) => left.localeCompare(right));

  const scripts = Object.keys(pkg.scripts ?? {}).sort((left, right) => left.localeCompare(right));
  const scriptMap = pkg.scripts ?? {};

  const topDirs = [];
  for (const dir of TOP_LEVEL_DIRS) {
    if (await safeExists(path.join(ROOT, dir))) {
      topDirs.push(`${dir}/`);
    }
  }

  const keyFiles = [];
  for (const file of KEY_FILES) {
    if (await safeExists(path.join(ROOT, file))) {
      keyFiles.push(file);
    }
  }

  const directorySnapshots = [];
  for (const dir of TOP_LEVEL_DIRS) {
    directorySnapshots.push({
      dir,
      children: await listChildren(dir),
    });
  }

  const trendsDir = path.join(ROOT, "content", "trends");
  const trendsFiles = (await safeExists(trendsDir))
    ? (await readdir(trendsDir, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
        .map((entry) => `content/trends/${entry.name}`)
        .sort((left, right) => left.localeCompare(right))
    : [];

  const context = {
    generatedAt: new Date().toISOString(),
    packageManager: pkg.packageManager ?? "n/a",
    scripts,
    scriptMap,
    topDirs,
    keyFiles,
    rootEntries,
    trendsFiles,
    dependencies: pkg.dependencies ?? {},
    devDependencies: pkg.devDependencies ?? {},
    directorySnapshots,
  };

  await writeFile(AGENTS_PATH, `${buildAgentsMd(context).trim()}\n`, "utf8");
  await writeFile(CONTEXT_PATH, `${buildContextMd(context).trim()}\n`, "utf8");

  process.stdout.write("Synced AGENTS.MD and CONTEXT.md\n");
}

main().catch((error) => {
  process.stderr.write(`${error?.stack ?? error}\n`);
  process.exitCode = 1;
});
