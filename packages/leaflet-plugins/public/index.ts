import { defineCustomElements } from '@dso-toolkit/core';
import * as L from 'leaflet';

import { layersPanel } from '../src/leaflet-plugins';

defineCustomElements();

const cities = L.layerGroup();

L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities);
L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities);
L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities);
L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);

const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr });
const streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

const map = L.map('map', {
  center: [39.73, -104.99],
  zoomControl: false,
  zoom: 10,
  layers: [grayscale, cities]
});

const baseLayers = {
  "Grayscale": grayscale,
  "Streets": streets
};

const overlays = {
  "Cities": cities
};

layersPanel(baseLayers, overlays).addTo(map);
