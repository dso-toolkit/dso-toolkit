import * as L from "leaflet";
import { html, nothing, render } from "lit-html";

import * as Dso from "../src";

const ButtonControl = L.Control.extend({
  onAdd(_map: L.Map) {
    const button = document.createElement("button");
    button.classList.add("dso-leaflet-button");
    button.innerHTML = '<dso-icon icon="pencil"></dso-icon><span>Teken een gebied op de kaart</span>';
    button.addEventListener("click", console.info);

    L.DomEvent.disableClickPropagation(button);

    return button;
  },
});

// use this to switch between native leaflet zoom and layers control and DSO custom map controls
const nativeControls = false;

const cities = L.layerGroup();

L.marker([52.3676, 4.9041], { icon: Dso.markerIcon() }).bindPopup("Dit is Amsterdam").addTo(cities);
L.marker([52.2292, 5.1669], { icon: Dso.markerIcon() }).bindPopup("Dit is Hilversum").addTo(cities);
L.marker([52.1561, 5.3878], { icon: Dso.markerIcon() }).bindPopup("Dit is Amersfoort").addTo(cities);
L.marker([52.2738, 5.1664], { icon: Dso.markerIcon() }).bindPopup("Dit is Bussum").addTo(cities);

const mbAttr =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mbUrl =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

const grayscale = L.tileLayer(mbUrl, { id: "mapbox/light-v9", tileSize: 512, zoomOffset: -1, attribution: mbAttr });
const streets = L.tileLayer(mbUrl, { id: "mapbox/streets-v11", tileSize: 512, zoomOffset: -1, attribution: mbAttr });

const map = L.map("map", {
  center: [52.28099623337852, 5.166754606044853],
  zoomControl: nativeControls,
  zoom: 11,
  maxZoom: 18,
  minZoom: 5,
  layers: [streets],
});

new ButtonControl({ position: "topleft" }).addTo(map);

const baseLayers = [
  {
    name: "Grayscale",
    layer: grayscale,
  },
  {
    name: "Straten",
    layer: streets,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- fakeLayer wordt alleen maar gebruikt om een onzin-item in de layer selector te tonen.
const fakeLayer = {} as any;

const overlays = [
  {
    name: "Plaatsen",
    layer: cities,
  },
  {
    name: "Niet beschikbaar",
    layer: fakeLayer,
    disabled: true,
  },
  {
    name: "Adressen",
    layer: L.tileLayer.wms("https://service.pdok.nl/kadaster/adressen/wms/v1_0", {
      format: "image/png",
      transparent: true,
      layers: "adressen",
      minZoom: 15,
    }),
  },
];

let devtools;
if (nativeControls) {
  const layersControl = L.control
    .layers(
      baseLayers.reduce((obj, l) => Object.assign(obj, { [l.name]: l.layer }), {}),
      overlays.reduce((obj, l) => Object.assign(obj, { [l.name]: l.layer }), {}),
    )
    .addTo(map);

  devtools = {
    addStreets: () => layersControl.addBaseLayer(streets, "Straten"),
    removeStreets: () => layersControl.removeLayer(streets),
    addGrayscale: () => layersControl.addBaseLayer(grayscale, "Overlay"),
    removeGrayscale: () => layersControl.removeLayer(grayscale),
    addCities: () => layersControl.addOverlay(cities, "Cities"),
    removeCities: () => layersControl.removeLayer(cities),
  };
} else {
  const mapControls = new Dso.MapControls(baseLayers, overlays).addTo(map);

  devtools = {
    addStreets: () => mapControls.addBaseLayer(streets, "Straten"),
    removeStreets: () => mapControls.removeLayer(streets),
    addGrayscale: () => mapControls.addBaseLayer(grayscale, "Grayscale"),
    removeGrayscale: () => mapControls.removeLayer(grayscale),
    addCities: () => mapControls.addOverlay(cities, "Plaatsen"),
    removeCities: () => mapControls.removeLayer(cities),
    enableFakeLayer: () => mapControls.enableLayer(fakeLayer),
    disableFakeLayer: () => mapControls.disableLayer(fakeLayer),
  };
}

render(
  html`
    <button type="button" @click=${devtools.addStreets}>add streets</button>
    <button type="button" @click=${devtools.removeStreets}>remove streets</button>
    <hr />
    <button type="button" @click=${devtools.addGrayscale}>add grayscale</button>
    <button type="button" @click=${devtools.removeGrayscale}>remove grayscale</button>
    <hr />
    <button type="button" @click=${devtools.addCities}>add cities</button>
    <button type="button" @click=${devtools.removeCities}>remove cities</button>
    ${!nativeControls
      ? html`
          <hr />
          <button type="button" @click=${devtools.enableFakeLayer}>enable fake layer</button>
          <button type="button" @click=${devtools.disableFakeLayer}>disable fake layer</button>
        `
      : nothing}
  `,
  document.getElementById("devtools"),
);
