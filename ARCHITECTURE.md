# DSO Toolkit architecture

Dit document beschrijft de visie en architectuur van het DSO Toolkit Design System.

Het begint met een samenvatting waarna per onderdeel een uitgebreide beschrijving volgt.

## Synopsis

De DSO Toolkit is een Design System en bestaat uit de volgende NPM packages:

* `@dso-toolkit/sources`
* `dso-toolkit`
* `@dso-toolkit/css`
* `@dso-toolkit/core`
* `@dso-toolkit/react`
* `@dso-toolkit/leaflet`
* `@dso-toolkit/react-leaflet`

![DSO Toolkit dependency graph](dependency-graph.svg)

## Termen

* **implementatie**: Binnen de context van de toolkit bedoelen we hier een *type uitvoering*: Een component heeft één of meerdere implementaties: HTML/CSS component, Web Component, React Component, Angular Component. Buiten de context van de toolkit kan een afnemer van de toolkit een component binnen zijn applicatie implementeren.
* **maintainer**: Een maintainer beheert de codebase van de DSO Toolkit.
* **component**: De DSO Toolkit maakt geen gebruik van een methode zoals Atomic Design: Binnen de toolkit is alles een component. Van een heading zoals `h1` tot een complexe werkvorm zoals Accordion.

## Sources

Deze package is de basis voor de andere packages in het DSO Toolkit Design System. Hier centraliseren we de functionaliteit die door maintainers wordt gebruikt:

* Implementatie details: Implementatie-agnostische documentatie over de functionaliteit van een component.
* Iconen: Alle iconen die in de applicaties van het DSO worden gebruikt.
* Styling: Component styling in de vorm van Sass mixins waarmee de diverse implementaties worden gestijld.
* Component model: Het technische model wat de functionaliteit van een component beschrijft.
* Storybook definities: Alles wat niet met templating van een Story te maken heeft.
* Storybook args: de laag tussen de Controls van Storybook en het technische model van een component.

In deze package wordt de eerste vertaalslag van Ontwerp naar Code gemaakt.

Directory layout:

```
/packages/sources
  /assets                                 Assets die van belang zijn voor afnemers van de toolkit, geen Storybook demo assets
  /src
    /components
      /<component>                        Directory per component
        /<component>.args.ts              Storybook techniek naar Model routines
        /<component>.content.ts           Demo/dummy content
        /<component>.models.ts            Functionaliteit in code
        /<component>.stories.ts           Implementatie agnostische Storybook definitie
        /readme.md                        Functionele documentatie
        /<component>.scss                 SCSS mixins. Bij het importeren van deze stylesheets genereren ze geen styling
    /icons                                DSO icons
    /styling                              Styling die niet bij een component hoort
      /global                             Basisstyling per element per stylesheet
      /grid                               Grid stylesheets
      /mixins                             Utility mixins
      /variables                          Globale variables
```

### Implementatie details

Per component wordt in `readme.md` functionele documentatie bijgehouden.

### Styling

De styling van de toolkit wordt in SCSS geschreven. Vanuit Sources bieden we de globale (basis) en component styling aan.

Als een component meerdere implementaties krijgt centraliseren we de styling in deze `sources` package en bieden we die aan als Sass mixins. Als een component maar één implementatie krijgt is de styling alleen in de betreffende package te vinden. Uiteraard baseert de styling zich wel op variables die in `sources` worden gezet.

### Component model

Per component is er een model (TypeScript interface) waar de functionaliteit in code wordt vastgelegd. Dit model is het contract waar implementaties aan moeten voldoen. Dit is een implementatie- en Storybook agnostisch model.

Componenten waarvan een web component aanwezig is hanteren de `dso` prefix voor events. Bijvoorbeeld `dsoRemove` of `dsoChange`.

### Storybook definities

Per component wordt de Storybook definitie bijgehouden. In de basis is dit een `export function storiesOfComponent(storybookParameters, componentParameters)`:

* `storybookParameters` is een component-overstijgend model voor de basis functionaliteit van Storybook.
* `componentParameters` is een component specifiek model. Over het algemeen zal dit alleen om de implementatie-specifieke template van het component gaan, maar voor complexe werkvormen kan dit uitgebreid worden om de documentatie te verbeteren.

Met deze opzet worden implementaties geforceerd identieke varianten op te leveren.

### Storybook args

Vanuit Storybook kan een component worden bediend en content worden aangeboden. Deze functie is het koppelvlak tussen demo/dummy content uit `<component>.content.ts` en Storybook Controls. De mapper `function componentArgsMapper(args: ComponentArgs)` kan voor simpele werkvormen soms overbodig voelen. Mochten de `ComponentModel` en `ComponentArgs` overeenkomen kan er gebruik gemaakt worden van de object spread shorthand `return { ...args };`. De signature wordt dan: `function componentArgsMapper(args: ComponentArgs): Required<ComponentModel>`.

## Storybook

De diverse implementaties van de DSO Toolkit componenten worden ieder in een eigen Storybook getoond.

### HTML/CSS components

De HTML/CSS componenten worden met `lit-html` gedocumenteerd.

### Web Components

Web Components schrijven we in TypeScript met [Stencil](https://stenciljs.com/).

### React Components

React Components worden gegenereerd door Stencil. Voor elke Web Component wordt er een binding component gegenereerd waarmee de React developer (afnemer) op een vertrouwde manier met de DSO Toolkit Web Components kan werken.

### Angular Components

We leveren geen Angular componenten. Angular heeft first class support voor Web Componenten. Voor meer informatie, zie de [Stencil documentatie](https://github.com/ionic-team/stencil-site/blob/f9289b0d52b13576b2dfcbdf4166e5f1aebb33e2/src/docs/framework-integration/angular.md#angular). Het hoofdstuk "Bindings" is niet van toepassing.

## Fractal

Fractal is het documentatie framework waar we mee zijn begonnen. Dit framework is EOL en wordt deprecated. Templates worden in Nunjucks geschreven waardoor het lastig is om componenten te "slotten".

De Fractal omgeving is nauw verweven met de toolkit codebase. Alles zit samen in de package `dso-toolkit`. We zijn bezig om deze codebase op te splitsen naar SCSS styling, markdown documentatie en lit templates. De component variant generator functionaliteit wordt overgenomen door Storybook.

### Bootstrap

De toolkit is gebaseerd op Bootstrap 3.3.7. Waar Bootstrap voorheen een expliciete dependency was die ook bij de afnemer werd geinstalleerd, hebben we de codebase van Bootstrap inmiddels ingecheckt en zijn we die langzaamaan aan het ontmantelen en opsplitsen. We zijn daar zo ver mee dat we de toolkit geen variant van Bootstrap meer kunnen noemen en third party Bootstrap gebaseerde modules (React/Angular componenten) zullen waarschijnlijk niet of slecht werken.
