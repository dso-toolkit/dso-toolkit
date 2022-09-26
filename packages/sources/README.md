# @dso-toolkit/sources

⚠️ De Public API is nog onder voorbehoud ⚠️

In deze package zitten alle bronbestanden die de basis leggen voor het DSO Design System.

## Models

Per component is er een model (TypeScript interface). Dit is een technische representatie van de functionele werking van een component. Implementaties gebruiken deze interface om een template function te maken. Deze functie wordt aan de `storiesOfXXX()` methode gegeven. Daarnaast kan met deze interface herbruikbaarheid binnen een implementatie ("Conclusion maakt gebruik van Alert") worden gefaciliteerd.

## Stories

Per component wordt een story definitie voor Storybook bijgehouden. Deze worden geschreven in TypeScript. Implementerende Storybooks blijven hierdoor dezelfde structuur aanbieden.

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
