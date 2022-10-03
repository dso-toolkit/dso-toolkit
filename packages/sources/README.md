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

Iconen staan in `src/icons`.
