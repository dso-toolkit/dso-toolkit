# dso-map-controls

## Instructies voor afnemers

Map Controls bestaat uit twee componenten, een button en een panel, aarvan de Panel optioneel is. Deze moeten dezelfde identifier hebben. Zie voorbeeld hieronder.

```
<dso-map-controls-buttons
  identifier="identifier"
  enable-map-layers="true"
  button-label="Kaartlagen"
  button-label-mode="responsive"
>
  <button type="button">
    <dso-icon icon="location-search"></dso-icon>
  </button>
  <button type="button">
    <dso-icon icon="measurement"></dso-icon>
  </button>
  <button type="button">
    <dso-icon icon="land"></dso-icon>
  </button>
</dso-map-controls-buttons>

<dso-map-controls-panel
  id="identifier"
  mode="sidebar"
  panel-title="Kaartlagen"
>
  <dso-map-base-layers></dso-map-base-layers>
  <dso-map-overlays></dso-map-overlays>
  <div class="dso-rich-content">
    <p>
      Dit is een Web Component wat aangesloten kan worden op Leaflet.js of
      OpenLayers.
    </p>
  </div>
</dso-map-controls-panel>
```
