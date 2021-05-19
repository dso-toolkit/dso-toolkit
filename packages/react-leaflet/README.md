# @dso-toolkit/react-leaflet

`react-leaflet` bindings for `@dso-toolkit/leaflet`.

## Requirements

This package needs

* `@dso-toolkit/core` for the presentation and interaction
* `@dso-toolkit/leaflet` for the Web Component to work with Leaflet

## Getting started

```
npm install @dso-toolkit/core @dso-toolkit/leaflet @dso-toolkit/react-leaflet
```

### Define custom elements

Presentation is handled by a custom element (Web Component) `<dso-map-controls>` so we need to define the custom elements:

```ts
import { defineCustomElements } from '@dso-toolkit/core'
import { render } from 'react-dom'

defineCustomElements()

render(app, document.getElementById('root'))
```

### `<MapControls>`

* Make sure to disable the default `ZoomControl`.
* Pass any layers that needs to be controlled as children.

```tsx
import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet';
import { markerIcon } from '@dso-toolkit/leaflet';
import { MapControls } from '@dso-toolkit/react-leaflet';

function MyMap() {
  const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
  const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'

  return (
    <MapContainer
      id="map"
      center={[39.73, -104.99]}
      zoom={11}
      maxZoom={18}
      minZoom={5}
      zoomControl={false}
    >
      <MapControl>
        <MapControl.BaseLayer name="Streets" checked>
          <TileLayer
            id="mapbox/streets-v11"
            tileSize={512}
            zoomOffset={-1}
            attribution={mapboxAttribution}
            url={mapboxUrl}
          />
        </MapControl.BaseLayer>
        <MapControl.BaseLayer name="Grayscale">
          <TileLayer
            id="mapbox/light-v9"
            tileSize={512}
            zoomOffset={-1}
            attribution={mapboxAttribution}
            url={mapboxUrl}
          />
        </MapControl.BaseLayer>
        <MapControl.Overlay name="Cities">
          <LayerGroup>
            <Marker position={[39.61, -105.02]} icon={markerIcon()}>
              <Popup>
                This is Littleton, CO.
              </Popup>
            </Marker>
            <Marker position={[39.74, -104.99]} icon={markerIcon()}>
              <Popup>
                This is Denver, CO.
              </Popup>
            </Marker>
            <Marker position={[39.73, -104.8]} icon={markerIcon()}>
              <Popup>
                This is Denver, CO.
              </Popup>
            </Marker>
            <Marker position={[39.77, -105.23]} icon={markerIcon()}>
              <Popup>
                This is Golden, CO.
              </Popup>
            </Marker>
          </LayerGroup>
        </MapControl.Overlay>
      </MapControl>
    </MapContainer>
  )
}
```
