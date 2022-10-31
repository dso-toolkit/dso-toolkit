import * as L from "leaflet";

export function markerIcon() {
  return L.divIcon({
    html: '<dso-icon icon="location-outline"></dso-icon>',
    iconSize: [24, 24],
    className: "dso-leaflet-marker-icon",
    iconAnchor: [12, 24],
    popupAnchor: [0, -20],
  });
}
