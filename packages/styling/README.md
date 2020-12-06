# @dso-toolkit/styling

⚠️ **WIP** - Do not use this project, see [issue #827](https://github.com/dso-toolkit/dso-toolkit/issues/827). ⚠️

Dit project bevat een SCSS implementatie van het DSO Design System.

Er zijn twee deliverables:
* Een CSS implementatie waar de consument de bijbehorende markup voor moet genereren.
* Losse component stylesheets. Deze worden voor de Web Components in `@dso-toolkit/core` gebruikt.

## Public API

* `dist/dso-icons.svg`
* `dist/dso.css`
* `dso.scss`

## Iconen

Iconen staat in `icons/`. De iconen worden gebundeld tot een spritesheet. Naast de losse iconen kan een SCSS stylesheet staan.

Component stylesheets mogen **geen verwijzing naar een `di()` implementatie bevatten**. Zie het kopje "`di()` en `di-variant()`" voor meer informatie.

### Stylesheet

Naast een icoon kan een bijbehorende stylesheet staan om varianten te genereren. Deze varianten mogen alleen in de `di()` en `di-variant()` mixins worden gebruikt.

Een grijze variant voor `caret-down` wordt op de volgende manier gemaakt:

```scss
@import "../variables.scss";

caret-down:grijs {
  color: $grijs-60;
}
```

### Spritesheet

De spritesheet bevat alle iconen met hun gestylde varianten die in `icons/` staan. De spritesheet wordt door het `<dso-icon>` Web Component gebruikt.

### `di()` en `di-variant()`

Deze mixins vallen niet onder de Public API van de DSO Toolkit en mogen alleen door DSO Toolkit maintainers worden ingezet. Deze mixins hebben niets te maken met het DSO Icon component! Zowel het CSS `svg.di` Component als het `<dso-icon>` Web Component.

Deze mixins geven de toolkit maintainer de mogelijkheid om iconen in componenten te plaatsen waar een implementator geen invloed op heeft. Bijvoorbeeld bij het Alert component. De juiste iconen staan er al voor de juiste varianten. Dit geeft een uniforme inzet van de iconen over de verschillende applicaties. Daarnaast kan het gebruik van deze iconen centraal worden beheerd. Bij een nieuw icoon in een bestaand component hoeven consumenten van de toolkit alleen maar een update van de toolkit te doen in plaats van code te modificeren.

Binnen de toolkit bestaan twee implementaties:

* Een `background-image` implementatie voor de CSS deliverable.
* Een `dataUri` implementatie in `@dso-toolkit/core` voor de Web Components.

Een component stylesheet mag geen verwijzing hebben naar een implementatie. Waar een component stylesheet wordt geimporteerd moet bepaald worden welke implementatie er geldt:

* `/packages/styling/dso.scss`: Hier is een `@import` naar de `background-image` implementatie. Later worden de verschillende componenten geimporteerd. De output van `dso.scss` bevat verwijzingen naar het icoon in de spritesheet `dso-icons.svg`
* `/packages/core/src/COMPONENT/COMPONENT.scss`: Voordat de component stylesheet uit `@dso-toolkit/styling` wordt geimporteerd is er een `@import` naar de `dataUri` variant gedaan en zijn de iconen die in dit Web Component gebruikt worden al ingeladen met de `dso-icon()` Sass function.

#### `background-image` implementatie

Zie `/packages/styling/mixins/di.scss`. Deze implementatie verwijst naar (een variant van) een icoon in `dso-icons.svg` Variant styling staat als `<style>` in de spritesheet.

#### `dataUri` implementatie

Zie `di.scss` en `dso-icon-sass-function.ts` in `/packages/core/src/icon`.

* `dso-icon-sass-function.ts`: Bevat een Sass function die aan de Sass compiler van de Stencil Components wordt meegegeven. Deze functie moet in elke Stencil Component stylesheet gebruikt worden om iconen te "preloaden" door ze in te lezen op een custom property.
* `di.scss`: Bevat de `di()` en `di-variant()` mixins. Deze mixin maakt een `background-image` met een verwijzing naar een custom property `--dso-icon`. Beide mixins hebben een argument met het alias naar het icoon. De waarde van `--dso-icon` is een verwijzing naar het eerder ingeladen icoon.

Een goed voorbeeld is het Alert component.
