---
name: setup-pre-commit
description: Настраивает pre-commit хуки Husky с lint-staged (Prettier), проверкой типов и тестами в текущем репозитории. Используй, когда нужно добавить pre-commit хуки, настроить Husky/lint-staged или запускать форматирование/тайпчек/тесты при коммите.
---

# Настройка pre-commit хуков

## Что будет настроено

- pre-commit хук **Husky**
- **lint-staged**, запускающий Prettier на всех staged-файлах
- конфиг **Prettier** (если отсутствует)
- запуск **typecheck** и **test** внутри pre-commit хука

## Шаги

### 1. Определи пакетный менеджер

Проверь наличие `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `yarn.lock` (yarn), `bun.lockb` (bun). Используй тот менеджер, для которого найден lock-файл. Если неясно, по умолчанию используй npm.

### 2. Установи зависимости

Установи как devDependencies:

```
husky lint-staged prettier
```

### 3. Инициализируй Husky

```bash
npx husky init
```

Команда создаст директорию `.husky/` и добавит `prepare: "husky"` в `package.json`.

### 4. Создай `.husky/pre-commit`

Запиши в файл следующее (для Husky v9+ shebang не нужен):

```
npx lint-staged
npm run typecheck
npm run test
```

**Адаптация**: замени `npm` на найденный пакетный менеджер. Если в `package.json` нет скриптов `typecheck` или `test`, пропусти соответствующие строки и сообщи об этом пользователю.

### 5. Создай `.lintstagedrc`

```json
{
  "*": "prettier --ignore-unknown --write"
}
```

### 6. Создай `.prettierrc` (если отсутствует)

Создавай только если в репозитории нет другого конфига Prettier. Используй значения по умолчанию:

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": false,
  "trailingComma": "es5",
  "semi": true,
  "arrowParens": "always"
}
```

### 7. Проверь

- [ ] `.husky/pre-commit` существует и исполняемый
- [ ] `.lintstagedrc` существует
- [ ] скрипт `prepare` в `package.json` равен `"husky"`
- [ ] конфиг `prettier` существует
- [ ] `npx lint-staged` запускается успешно

### 8. Коммит

Добавь все измененные/созданные файлы в stage и сделай коммит с сообщением: `Add pre-commit hooks (husky + lint-staged + prettier)`

Это прогонит новые pre-commit хуки и послужит быстрым smoke-тестом, что все работает.

## Примечания

- Для Husky v9+ shebang в hook-файлах не требуется
- `prettier --ignore-unknown` пропускает файлы, которые Prettier не умеет парсить (изображения и т.д.)
- В pre-commit сначала запускается `lint-staged` (быстро, только staged), затем полный `typecheck` и тесты
