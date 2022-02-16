import { defineCustomElements } from '@dso-toolkit/core';
import * as L from 'leaflet';
import { html, render } from 'lit-html';

import * as Dso from '../src';

defineCustomElements();

const ButtonControl = L.Control.extend({
  onAdd(map: L.Map) {
    const button = document.createElement('button');
    button.classList.add('dso-leaflet-button');
    button.innerHTML = '<dso-icon icon="pencil"></dso-icon><span>Teken een gebied op de kaart</span>';
    button.addEventListener('click', console.log);

    L.DomEvent.disableClickPropagation(button);

    return button;
  }
});

// use this to switch between native leaflet zoom and layers control and DSO custom map controls
const nativeControls = false;

const cities = L.layerGroup();

L.marker([52.3676, 4.9041], { icon: Dso.markerIcon() }).bindPopup('Dit is Amsterdam').addTo(cities);
L.marker([52.2292, 5.1669], { icon: Dso.markerIcon() }).bindPopup('Dit is Hilversum').addTo(cities);
L.marker([52.1561, 5.3878], { icon: Dso.markerIcon() }).bindPopup('Dit is Amersfoort').addTo(cities);
L.marker([52.2738, 5.1664], { icon: Dso.markerIcon() }).bindPopup('Dit is Bussum').addTo(cities);

const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr });
const streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

const map = L.map('map', {
  center: [52.28099623337852, 5.166754606044853],
  zoomControl: nativeControls,
  zoom: 11,
  maxZoom: 18,
  minZoom: 5,
  layers: [streets]
});

new ButtonControl({ position: 'topleft' }).addTo(map);

const baseLayers = [
  {
    name: 'Grayscale',
    layer: grayscale
  },
  {
    name: 'Straten',
    layer: streets
  }
];

const overlays = [
  {
    name: 'Plaatsen',
    layer: cities
  }
];

let devtools;
if (nativeControls) {
  const layersControl = L.control.layers(
    baseLayers.reduce((obj, l) => Object.assign(obj, { [l.name]: l.layer }), {}),
    overlays.reduce((obj, l) => Object.assign(obj, { [l.name]: l.layer }), {})
  ).addTo(map);

  devtools = {
    addStreets: () => layersControl.addBaseLayer(streets, 'Streets'),
    removeStreets: () => layersControl.removeLayer(streets),
    addGrayscale: () => layersControl.addBaseLayer(grayscale, 'Overlay'),
    removeGrayscale: () => layersControl.removeLayer(grayscale),
    addCities: () => layersControl.addOverlay(cities, 'Cities'),
    removeCities: () => layersControl.removeLayer(cities)
  };
}
else {
  const mapControls = new Dso.MapControls(baseLayers, overlays).addTo(map);

  devtools = {
    addStreets: () => mapControls.addBaseLayer(streets, 'Streets'),
    removeStreets: () => mapControls.removeLayer(streets),
    addGrayscale: () => mapControls.addBaseLayer(grayscale, 'Grayscale'),
    removeGrayscale: () => mapControls.removeLayer(grayscale),
    addCities: () => mapControls.addOverlay(cities, 'Cities'),
    removeCities: () => mapControls.removeLayer(cities)
  };
}

render(
  html`
    <button type="button" @click=${devtools.addStreets}>
      add streets
    </button>
    <button type="button" @click=${devtools.removeStreets}>
      remove streets
    </button>
    <hr>
    <button type="button" @click=${devtools.addGrayscale}>
      add grayscale
    </button>
    <button type="button" @click=${devtools.removeGrayscale}>
      remove grayscale
    </button>
    <hr>
    <button type="button" @click=${devtools.addCities}>
      add cities
    </button>
    <button type="button" @click=${devtools.removeCities}>
      remove cities
    </button>
  `,
  document.getElementById('devtools')!
);
