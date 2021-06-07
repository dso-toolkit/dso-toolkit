# `@dso-toolkit/core`

See https://www.github.com/dso-toolkit/dso-toolkit

## `di()` en `di-variant()` SCSS mixins

Dit project bevat een dataUri implementatie. Zie `di.scss` en `dso-icon-sass-function.ts` in `/packages/core/src/icon`.

* `dso-icon-sass-function.ts`: Bevat een Sass function die aan de Sass compiler van de Stencil Components wordt meegegeven. Deze functie moet in elke Stencil Component stylesheet gebruikt worden om iconen te "preloaden" door ze in te lezen op een custom property.
* `di.scss`: Bevat de `di()` en `di-variant()` mixins. Deze mixin maakt een `background-image` met een verwijzing naar een custom property `--dso-icon`. Beide mixins hebben een argument met het alias naar het icoon. De waarde van `--dso-icon` is een verwijzing naar het eerder ingeladen icoon.
