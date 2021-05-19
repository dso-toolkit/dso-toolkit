# @dso-toolkit/CSS

Dit project bevat een CSS implementatie van het DSO Design System.

⚠️ **WIP** - Do not use this project, see [issue #827](https://github.com/dso-toolkit/dso-toolkit/issues/827). ⚠️

## Getting started

```
npm install @dso-toolkit/css
```

Import or bundle `dist/dso.css`.

## Public API

* `dist/dso-icons.svg`
* `dist/dso.css`

## Iconen

Iconen komen uit `@dso-toolkit/styling` en worden gebundeld tot een spritesheet: `dist/dso-icons.svg`.

### `di()` en `di-variant()` implementatie

Deze mixins vallen niet onder de Public API van `@dso-toolkit/css` en mogen alleen door DSO Toolkit maintainers worden ingezet.

Deze mixins geven de toolkit maintainer de mogelijkheid om iconen in componenten te plaatsen waar een implementator geen invloed op heeft. Bijvoorbeeld bij het Alert component. De juiste iconen staan er al voor de juiste varianten. Dit geeft een uniforme inzet van de iconen over de verschillende applicaties. Daarnaast kan het gebruik van deze iconen centraal worden beheerd. Bij een nieuw icoon in een bestaand component hoeven consumenten van de toolkit alleen maar een update van de toolkit te doen in plaats van code te modificeren.
