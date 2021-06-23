import * as React from 'react';
import { render } from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet';
import { defineCustomElements } from '@dso-toolkit/core';
import { markerIcon } from '@dso-toolkit/leaflet';

import { MapControls } from '../src';

defineCustomElements();

const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'

const app = (
  <MapContainer
    id="map"
    center={[52.28099623337852, 5.166754606044853]}
    zoom={11}
    maxZoom={18}
    minZoom={5}
    zoomControl={false}
  >
    <MapControls>
      <MapControls.BaseLayer name="Straten" checked>
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
      <MapControls.Overlay name="Plaatsen">
        <LayerGroup>
          <Marker position={[52.3676, 4.9041]} icon={markerIcon()}>
            <Popup>
              Dit is Amsterdam
            </Popup>
          </Marker>
          <Marker position={[52.2292, 5.1669]} icon={markerIcon()}>
            <Popup>
              Dit is Hilversum
            </Popup>
          </Marker>
          <Marker position={[52.1561, 5.3878]} icon={markerIcon()}>
            <Popup>
              Dit is Amersfoort
            </Popup>
          </Marker>
          <Marker position={[52.2738, 5.1664]} icon={markerIcon()}>
            <Popup>
              Dit is Bussum
            </Popup>
          </Marker>
        </LayerGroup>
      </MapControls.Overlay>
    </MapControls>
  </MapContainer>
);

render(app, document.getElementById('root'));
