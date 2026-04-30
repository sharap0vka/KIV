# DESIGN — KIV Brutalist System

Документ фиксирует визуальную систему проекта `site2026` по эталону `ref/index.html`.
Цель: единый source of truth для токенов, layout-паттернов и компонентных правил.

## 1) Принципы

- Тёмный монохром: почти весь UI строится на `#1f2228` + белый текст.
- Терминальный характер: моноширинный UI-first интерфейс, sans только для читабельных абзацев.
- Sharp geometry: нулевая скруглённость по умолчанию, акцент через ритм, а не декор.
- Контраст через прозрачности: глубина достигается opacity-слоями и бордерами, не тенями.
- Информационная плотность: крупный hero + плотные табличные/карточные секции ниже.

## 2) Design Tokens

### 2.1 Цвета

- `--bg: #1f2228`
- `--bg-2: #1a1d22`
- `--fg: #ffffff`
- `--fg-70: rgba(255, 255, 255, 0.7)`
- `--fg-50: rgba(255, 255, 255, 0.5)`
- `--fg-30: rgba(255, 255, 255, 0.3)`
- `--fg-15: rgba(255, 255, 255, 0.15)`
- `--fg-10: rgba(255, 255, 255, 0.1)`
- `--fg-05: rgba(255, 255, 255, 0.05)`
- `--fg-03: rgba(255, 255, 255, 0.03)`
- `--ring: rgba(59, 130, 246, 0.5)` (focus-visible)
- Функциональные статусы (локально в блоках): success `#9be7a8`, warn `#f4d28e`, danger `#f4a4a4`

### 2.2 Типографика

- `--mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`
- `--sans: "Inter", ui-sans-serif, system-ui, sans-serif`
- Основной шрифт страницы: mono
- Текст чтения (`p`, `li`, описания) — sans

### 2.3 Ритм и контейнер

- Контейнер: `max-width: 1280px`
- Горизонтальные поля: `32px` (desktop), `20px` (mobile)
- Секционные интервалы: 56 / 72 / 88 px
- Бордер-сетка: `1px solid var(--fg-10)`

## 3) Глобальная среда

- `body` имеет layered-ambient фон:
  - фиксированная grid-подложка (64x64),
  - радиальные световые пятна с низкой прозрачностью.
- `::selection`: белый текст на мягком светлом фоне.
- Links по умолчанию белые, на hover тускнеют до `--fg-50`.
- Любые интерактивы обязаны иметь `:focus-visible` через `--ring`.

## 4) Структура главной

Главная строится как вертикальная последовательность:

1. `topbar` (sticky)
2. `statusbar`
3. `hero` (2 колонки)
4. `ticker`
5. `articles feed`
6. `trends table`
7. `concepts glossary`
8. `colophon/about`
9. `footer`

## 5) Компонентные правила

### 5.1 Topbar

- Высота: `56px`
- Полупрозрачный фон + blur, нижний divider.
- Состав: brand / nav / CTA.
- Active link подчёркивается `1px` линией.

### 5.2 Statusbar

- Высота: `32px`
- Uppercase/meta-ритм, compact терминальная телеметрия.
- Разделение на две группы: build/git и reader/time.

### 5.3 Hero

- Отступы: `88px 0 72px`
- Grid: `1fr 320px`
- H1: `clamp(56px, 11vw, 168px)`, `font-weight: 200`, `line-height: 0.92`
- Tagline: sans `18px`, `1.55`
- CTA: primary + ghost кнопки.

### 5.4 Buttons

- `.btn`: uppercase mono, `12px`, трекинг `0.12em`, sharp border.
- `.btn.primary`: белый фон, тёмный текст.
- Hover меняет только фон/границу, без тени.

### 5.5 Terminal Card

- Рамка `--fg-15`, фон `rgba(0,0,0,.2)`, без radius.
- Header с pseudo window controls.
- Body моноширинный, строки в стиле `prompt/cmd/out`.
- Анимируемая "печать" в последней строке допустима.

### 5.6 Feed Cards

- 12-колоночная сетка, обычная карточка `span 6`, feature `span 12`.
- Hover: `border-color: --fg-30`, `background: --fg-03`.
- Meta/теги в uppercase mono.

### 5.7 Trends Table

- Grid-строка: `48px 1fr 130px 130px 90px 24px` (desktop).
- Header row с более высоким контрастом и uppercase label.
- Sparkline как тонкая inline-графика справа от delta.

### 5.8 Concepts Glossary

- Плитка 3 колонки с рамочной матрицей.
- Карточки имеют порядковый номер в правом верхнем углу.
- Заголовок + определение + aliases.

### 5.9 Colophon/Stack

- 2-колоночный блок: narrative + tech-stack matrix.
- Stack как таблица из двух колонок (`k`/`v`) в рамочной сетке.

### 5.10 Footer

- Репозиторное дерево в `pre`, моноширинное.
- Bottom bar: лицензия + утилитарные ссылки.

## 6) Motion & Interaction

- Плавность очень короткая: ~120-160ms.
- Разрешены:
  - `blink` курсора,
  - typewriter в терминале,
  - linear ticker-scrolling (60s, infinite).
- Запрещены тяжёлые анимации, spring, масштабные transform-переходы.

## 7) Адаптив

### `<980px`

- Hero/About переходят в 1 колонку.
- Feed-карточки становятся full-width.
- Glossary: 2 колонки.
- Trends скрывает `lang` и `stars`.
- Верхняя nav скрывается.

### `<640px`

- Контейнер уменьшает горизонтальный padding до `20px`.
- Glossary: 1 колонка.
- В topbar скрываются вторичные CTA (pill + first ghost button).

## 8) Контентный маппинг

- Структура и визуальный ритм главной соответствуют `ref/index.html`.
- Данные остаются project-driven:
  - `articles`/`concepts` из Velite,
  - `trends` из snapshot источника.
- Внешний вид приоритетнее внутренней компонентной абстракции:
  если shared-primitive мешает 1:1, на главной допустимы локальные class-блоки.

## 9) Do / Don't

### Do

- Держать высокий контраст белого на `#1f2228`.
- Использовать mono как базовый визуальный голос.
- Строить иерархию через размер, трекинг, divider-сетку.
- Сохранять sharp edges и аккуратный uppercase-meta.

### Don't

- Не добавлять box-shadow, glow-кнопки, мягкие радиусы.
- Не уходить в цветную палитру кроме функциональных индикаторов.
- Не перегружать главную новыми блоками, которых нет в референсе.
- Не заменять плотную композицию "воздушным лендингом".
