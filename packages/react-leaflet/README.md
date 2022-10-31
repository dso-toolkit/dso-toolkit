# @dso-toolkit/react-leaflet

`react-leaflet` bindings for `@dso-toolkit/leaflet`.

## Requirements

This package needs

- `@dso-toolkit/core` for the presentation and interaction
- `@dso-toolkit/leaflet` for the Web Component to work with Leaflet

## Getting started

```
npm install @dso-toolkit/core @dso-toolkit/leaflet @dso-toolkit/react-leaflet
```

### Define custom elements

Presentation is handled by a custom element (Web Component) `<dso-map-controls>` so we need to define the custom elements:

```ts
import { defineCustomElements } from "@dso-toolkit/core";
import { render } from "react-dom";

defineCustomElements();

render(app, document.getElementById("root"));
```

### `<MapControls>`

- Make sure to disable the default `ZoomControl`.
- Pass any layers that needs to be controlled as children.

### `<MapControls.BaseLayer>` & `<MapControls.Overlay>`

Layer container. Layer is passed as `children`.

```ts
export interface ControlledLayerProps {
  /**
   * Name of layer, shown to user.
   */
  name: string;

  /**
   * Whether or not the layer is currently visible.
   */
  checked?: boolean;

  /**
   * Whether or not the layer is disabled.
   */
  disabled?: boolean;

  /**
   * Layer that this ControlledLayer component manages.
   */
  children: React.ReactNode;
}
```

## Example

```tsx
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup } from "react-leaflet";
import { markerIcon } from "@dso-toolkit/leaflet";
import { MapControls } from "@dso-toolkit/react-leaflet";

function MyMap() {
  const mapboxAttribution =
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
  const mapboxUrl =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

  return (
    <MapContainer id="map" center={[39.73, -104.99]} zoom={11} maxZoom={18} minZoom={5} zoomControl={false}>
      <MapControls>
        <MapControls.BaseLayer name="Streets" checked>
          <TileLayer
            id="mapbox/streets-v11"
            tileSize={512}
            zoomOffset={-1}
            attribution={mapboxAttribution}
            url={mapboxUrl}
          />
        </MapControls.BaseLayer>
        <MapControls.BaseLayer name="Grayscale">
          <TileLayer
            id="mapbox/light-v9"
            tileSize={512}
            zoomOffset={-1}
            attribution={mapboxAttribution}
            url={mapboxUrl}
          />
        </MapControls.BaseLayer>
        <MapControls.Overlay name="Cities" disabled>
          <LayerGroup>
            <Marker position={[39.61, -105.02]} icon={markerIcon()}>
              <Popup>This is Littleton, CO.</Popup>
            </Marker>
            <Marker position={[39.74, -104.99]} icon={markerIcon()}>
              <Popup>This is Denver, CO.</Popup>
            </Marker>
            <Marker position={[39.73, -104.8]} icon={markerIcon()}>
              <Popup>This is Denver, CO.</Popup>
            </Marker>
            <Marker position={[39.77, -105.23]} icon={markerIcon()}>
              <Popup>This is Golden, CO.</Popup>
            </Marker>
          </LayerGroup>
        </MapControls.Overlay>
      </MapControls>
    </MapContainer>
  );
}
```

## Maintenance

### Releasing to NPM

Build local dependencies:

```
yarn workspace @dso-toolkit/sources build
yarn workspace @dso-toolkit/css build
yarn workspace @dso-toolkit/core build
yarn workspace @dso-toolkit/leaflet build
```

Build `@dso-toolkit/react-leaflet` and set version:

```
yarn workspace @dso-toolkit/react-leaflet build
yarn workspace @dso-toolkit/react-leaflet version 1.0.0 --immediate
```

Update `package.json:peerDependencies:@dso-toolkit/core` and `package.json:peerDependencies:@dso-toolkit/core` version accordingly.

Run Yarn:

```
yarn install
```

Stage changes (package.json, yarn.lock, CHANGELOG) and commit with meaningful release commit message (ie. "@dso-toolkit/react-leaflet - Release v1.0.0"). Then publish to NPM:

```
yarn workspace @dso-toolkit/react-leaflet npm publish --access public
```

And push the release commit and commit tag
