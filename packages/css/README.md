# @dso-toolkit/CSS

Dit project bevat een CSS implementatie van het DSO Design System.

⚠️ **WIP** - Do not use this project, see [issue #827](https://github.com/dso-toolkit/dso-toolkit/issues/827). ⚠️

## Getting started

```
npm install @dso-toolkit/css
```

Import or bundle `dist/dso.css`.

## Public API

- `dist/dso-icons.svg`
- `dist/dso.css`

## Iconen

Iconen komen uit `@dso-toolkit/sources` en worden gebundeld tot een spritesheet: `dist/dso-icons.svg`.

### Spritesheet

De spritesheet bevat alle iconen met hun gestijlde varianten uit `@dso-toolkit/sources`.

### `di()` en `di-variant()` implementatie

Dit project heeft een `background-image` implementatie. Zie `/packages/css/mixins/di.scss`. Deze implementatie verwijst naar (een variant van) een icoon in `dso-icons.svg` Variant styling staat als `<style>` in de spritesheet.
