# @dso-toolkit/leaflet

Leaflet styling and bindings for `@dso-toolkit/core`.

## Target audience

Leaflet implementators that would like to use the DSO Leaflet components and styling.

In case of framework usage a developer needs to create bindings or they can use `@dso-toolkit/react-leaflet` if they are already using `react-leaflet`.

## Requirements

This package needs `@dso-toolkit/core` for the presentation and interaction.

## Getting started

```
npm install @dso-toolkit/core @dso-toolkit/leaflet
```

### Styling

Make sure to bundle `dso-leaflet.css` from this package and NOT the default `leaflet.css`. This is to make sure every Leaflet instance looks the same.

### Define custom elements, create `MapControls` and add to `map`.

- Presentation is handled by a custom element (Web Component) `<dso-map-controls>` so we need to define the custom elements.
- Make sure to disable the default `ZoomControl`.
- Pass any layers that needs to be controlled as arguments.

```tsx
import { defineCustomElements } from "@dso-toolkit/core";
import { markerIcon, MapControls, LayerObject } from "@dso-toolkit/leaflet";

defineCustomElements();

const cities = L.layerGroup();

L.marker([39.61, -105.02], { icon: markerIcon() }).bindPopup("This is Littleton, CO.").addTo(cities);
L.marker([39.74, -104.99], { icon: markerIcon() }).bindPopup("This is Denver, CO.").addTo(cities);
L.marker([39.73, -104.8], { icon: markerIcon() }).bindPopup("This is Aurora, CO.").addTo(cities);
L.marker([39.77, -105.23], { icon: markerIcon() }).bindPopup("This is Golden, CO.").addTo(cities);

const mbAttr =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mbUrl =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

const grayscale = L.tileLayer(mbUrl, { id: "mapbox/light-v9", tileSize: 512, zoomOffset: -1, attribution: mbAttr });
const streets = L.tileLayer(mbUrl, { id: "mapbox/streets-v11", tileSize: 512, zoomOffset: -1, attribution: mbAttr });

const map = L.map("map", {
  center: [39.73, -104.99],
  zoomControl: false,
  zoom: 11,
  maxZoom: 18,
  minZoom: 5,
  layers: [streets],
});

const baseLayers: LayerObject[] = [
  { name: "Z Grayscale", layer: grayscale },
  { name: "Streets", layer: streets },
];

const overlays: LayerObject[] = [{ name: "Cities", layer: cities }];

const mapControls = new MapControls(baseLayers, overlays);
mapControls.addTo(map);
```

## Maintenance

### Releasing to NPM

Build local dependencies:

```
yarn workspace @dso-toolkit/sources build
yarn workspace @dso-toolkit/css build
yarn workspace @dso-toolkit/core build
```

Build `@dso-toolkit/leaflet` and set version:

```
yarn workspace @dso-toolkit/leaflet build
yarn workspace @dso-toolkit/leaflet version 1.0.0 --immediate
```

Update `package.json:peerDependencies:@dso-toolkit/core` version accordingly.

Run Yarn:

```
yarn install
```

Stage changes (package.json, yarn.lock, CHANGELOG) and commit with meaningful release commit message (ie. "@dso-toolkit/leaflet - Release v1.0.0"). Then publish to NPM:

```
yarn workspace @dso-toolkit/leaflet npm publish --access public
```

And push the release commit and commit tag
