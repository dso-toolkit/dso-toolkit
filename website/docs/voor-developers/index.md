---
label: Voor developers
title: Documentatie voor developers
---

Als developer wil je voorkomen dat er dubbel werk uitgevoerd wordt. De toolkit geeft een css basis met alle _Do's and Dont's_ over het front-end ontwerp. Neem de documentatie pagina's over lay-out, kleur, en typography door.

Speciale aandacht is vereist voor de digitale toegankelijkheid, dit is een onderwerp met een grote invloed op de bouw van het beoogde platform.

Het DSO Toolkit ecosysteem levert een aantal NPM packages:

- `dso-toolkit` - De basis package voor de styling.
- `@dso-toolkit/core` - Web Components.
- `@dso-toolkit/react` - React bindings voor de Web Components uit `@dso-toolkit/core`.
- `@dso-toolkit/leaflet` - Leaflet bindings voor Map Controls
- `@dso-toolkit/react-leaflet` - React Leaflet bindings naar `@dso-toolkit/leaflet`.

### Getting started

De DSO Toolkit kan in verschillende gradaties gebruikt worden:

### CSS only

De markup moet conform de voorschriften worden gegenereerd.

#### NPM

```
npm install dso-toolkit
```

CSS file: `dso-toolkit/styles/dso.css`

Bij een omgeving met een bundler:

```javascript
import "dso-toolkit/dso.css";
```

Let op verwijzingen naar assets bij het handmatig kopiëren.

#### CDN

```html
<link rel="stylesheet" href="https://cdn.dso-toolkit.nl/[master|VERSION]/styles/dso.css" />
```

### CSS + Web Components

Voor componenten waar een Web Component voor bestaat kan direct het Web Component worden aangeroepen. De CSS is nodig voor globale styling en voor componenten waar (nog) geen Web Component voor is

Zie instructies voor CSS, daarnaast:

#### NPM

```
npm install @dso-toolkit/core
```

```javascript
import { defineCustomElements } from "@dso-toolkit/core";

defineCustomElements();
```

#### CDN

```html
<script type="module" src="https://cdn.dso-toolkit.nl/[master|VERSION]/core/dso-toolkit.esm.js"></script>
<script nomodule src="https://cdn.dso-toolkit.nl/[master|VERSION]/core/dso-toolkit.js"></script>
```

### CSS + Web Components + Framework specific bindings

Als er gebruik wordt gemaakt van React heeft deze methode de voorkeur. Op dit moment is er alleen een React binding. Dit zijn gegenereerde React componenten die het bijbehorende Web Component aanroept. Het voordeel is dat voor non-scalar data (geen tekst of nummer) geen wrapper componenten hoeven worden geschreven. Zie de Stencil Documentatie voor meer informatie: https://stenciljs.com/docs/overview.

Zie instructies voor CSS, daarnaast:

```
npm install @dso-toolkit/core @dso-toolkit/react
```

`@dso-toolkit/react` heeft een peer dependency op `@dso-toolkit/core`, vandaar dat deze expliciet in het project als dependency opgenomen moet worden.

```javascript
import React from "react";
import ReactDOM from "react-dom";

// Bundle de CSS uit dso-toolkit
import "dso-toolkit/dist/toolkit/styles/dso.css";

// Bundle de Web Components uit @dso-toolkit/core
import { defineCustomElements, setAssetPath } from "@dso-toolkit/core";

// Gebruik de React wrappers voor de Web Components
import { DsoAlert, DsoDatePicker } from "@dso-toolkit/react";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

setAssetPath(document.baseURI); // Nodig voor het resolven van assets
defineCustomElements(); // Registreer de Web Components

function App() {
  const [date, setDate] = useState({});

  return (
    <>
      {/* Gebruik <DsoDatePicker> en NIET <dso-date-picker> */}
      <DsoDatePicker value={date.value} onDsoDateChange={(e) => setDate(e.detail)} />
      <pre>{JSON.stringify(date || "change date")}</pre>
    </>
  );
}
```

## Links naar relevante pagina's:

- [README (English)](https://github.com/dso-toolkit/dso-toolkit/blob/master/README.md)
- [Kleurgebruik](/fundament/kleuren)
- [Typografie](/fundament/typografie)
- [Lay-out](/fundament/layout)
- [Meewerken aan de toolkit](https://github.com/dso-toolkit/dso-toolkit/blob/master/CONTRIBUTING.md)
