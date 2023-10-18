# dso-map-controls-buttons

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute           | Description                                                                                                                              | Type                                   | Default        |
| ------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------- |
| `buttonLabel`             | `button-label`      | Text shown on the panel toggle button.                                                                                                   | `string`                               | `"Kaartlagen"` |
| `buttonLabelMode`         | `button-label-mode` | When 'hidden', the button label will not be shown on large viewport.                                                                     | `"hidden" \| "responsive"`             | `"responsive"` |
| `disableZoom`             | `disable-zoom`      | To disable the zoom controls:  * `in`: Disable zoom in button. * `out`: Disable zoom out button. * `both`: Disable zoom in and zoom out. | `"both" \| "in" \| "out" \| undefined` | `undefined`    |
| `enableMapLayers`         | `enable-map-layers` | To enable native map layers                                                                                                              | `boolean`                              | `true`         |
| `identifier` _(required)_ | `identifier`        | To link the Map Controls Toggle Button with `aria-controls` to a different element, most likely an Map Controls Panel.                   | `string \| undefined`                  | `undefined`    |
| `open`                    | `open`              | To show and hide the Map Controls.                                                                                                       | `boolean`                              | `false`        |


## Events

| Event        | Description                                                                                                                                                                                                                                                                                   | Type                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `dsoToggle`  | emits when the panel opens or closes.  - `event.detail.originalEvent` contains the original `MouseEvent / KeyboardEvent` when the panel is toggled by clicking the visibility button or the close button. - `event.detail.open` is true when the panel opens and false when the panel closes. | `CustomEvent<MapControlsToggleEvent>` |
| `dsoZoomIn`  | Emitted when the user activates the zoom in button.                                                                                                                                                                                                                                           | `CustomEvent<MouseEvent>`             |
| `dsoZoomOut` | Emitted when the user activates the zoom out button.                                                                                                                                                                                                                                          | `CustomEvent<MouseEvent>`             |


## Dependencies

### Used by

 - [dso-map-controls](../map-controls)

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-map-controls-buttons --> dso-icon
  dso-map-controls --> dso-map-controls-buttons
  style dso-map-controls-buttons fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
