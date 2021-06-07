# @dso-toolkit/sources

⚠️ De Public API is nog onder voorbehoud ⚠️

In deze package zitten alle bronbestanden die de basis leggen voor het DSO Design System (DS²O).

## Models

Per component is er een model (TypeScript interface). Dit is een technische representatie van de functionele werking van een component. Implementaties gebruiken deze interface om een template function te maken. Deze functie wordt aan de `storiesOfXXX()` methode gegeven. Daarnaast kan met deze interface herbruikbaarheid binnen een implementatie ("Conclusion maakt gebruik van Alert") worden gefaciliteerd.

## Stories

Per component wordt een story definitie voor Storybook bijgehouden. Deze worden geschreven in TypeScript en gebundled met `microbundle`. Implementerende Storybooks blijven hierdoor dezelfde structuur aanbieden.

## Styling

De visuele ontwerpen van het UI/UX team worden uitgewerkt in SCSS stylesheets. Dit kunnen component specifieke stylesheets zijn of globale stylesheets. Deze stylesheets worden door de implementaties `@dso-toolkit/core`, `@dso-toolkit/css` en `dso-toolkit` gebruikt om te stijlen.

## Iconen

Iconen staan in `src/icons`. Naast een icoon kan een stylesheet staan om varianten te genereren. Deze varianten mogen alleen in de `di()` en `di-variant()` mixins worden gebruikt.

Een grijze variant voor `caret-down` wordt op de volgende manier gemaakt:

```scss
// src/icons/caret-down.scss, staat naast src/icons/caret-down.svg
@import "../variables.scss";

caret-down:grijs {
  color: $grijs-60;
}
```

## `di()` en `di-variant()` SCSS mixins

Deze mixins vallen niet onder de Public API van de DSO Toolkit en mogen alleen door DSO Toolkit maintainers worden ingezet. Deze mixins hebben niets te maken met het DSO Icon component. Zowel het CSS `svg.di` Component als het `<dso-icon>` Web Component.

Implementatoren van `@dso-toolkit/sources` moeten de volgende mixins in de global SCSS scope leveren:

* `@mixin di($icon, $size: $dso-icon-size, $vertical-align: $dso-icon-vertical-align)`
* `@mixin di-variant($icon)`

Voor inspiratie:
* `packages/core/src/icon/di.scss`
* `packages/css/src/mixins/di.scss`

Deze mixins geven de toolkit maintainers de mogelijkheid om iconen in componenten te plaatsen waar een implementator geen invloed op heeft. Bijvoorbeeld bij het Alert component. De juiste iconen staan er al voor de juiste varianten. Dit geeft een uniforme inzet van de iconen over de verschillende applicaties. Daarnaast kan het gebruik van deze iconen centraal worden beheerd. Bij een nieuw icoon in een bestaand component hoeven consumenten van de toolkit alleen maar een update van de toolkit te doen in plaats van code te modificeren.

Binnen de toolkit bestaan twee implementaties:

* Een `background-image` implementatie voor de CSS implementatie in `@dso-toolkit/css`.
* Een `dataUri` implementatie in `@dso-toolkit/core` voor de Web Components.

Een component stylesheet mag geen verwijzing hebben naar een implementatie. Waar een component stylesheet wordt geimporteerd moet bepaald worden welke implementatie er geldt:

* `/packages/css/dso.scss`: Hier is een `@import` naar de `background-image` implementatie. Later worden de verschillende componenten geimporteerd. De output van `dso.scss` bevat verwijzingen naar het icoon in de spritesheet `dso-icons.svg`
* `/packages/core/src/COMPONENT/COMPONENT.scss`: Voordat de component stylesheet uit `@dso-toolkit/sources` wordt geimporteerd is er een `@import` naar de `dataUri` variant gedaan en zijn de iconen die in dit Web Component gebruikt worden al ingeladen met de `dso-icon()` Sass function.
