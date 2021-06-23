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
      <MapControls.Overlay name="Cities">
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
      </MapControls.Overlay>
    </MapControls>
  </MapContainer>
);

render(app, document.getElementById('root'));
