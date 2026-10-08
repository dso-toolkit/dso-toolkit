# `<dso-grid-column>`

Een grid kolom valt in overlay-modus over de andere kolommen van de row. Zie de voorbeeldpagina's onder Patronen voor hoe het component met `<dso-grid-column>` werkt.

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description                                                                                                                                                                                                                                                                                                                        | Type                  | Default     |
| ---------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `columns` _(required)_ | `columns` | The column widths per breakpoint (e.g. "xs-4", "md-6 lg-8"). Without "col-" prefix. Widths only; push, pull and offset are not supported.                                                                                                                                                                                          | `string \| undefined` | `undefined` |
| `overlay`              | `overlay` | When set, the column content expands to the full width of the row and renders as a modal overlay with a backdrop. The column keeps its own place in the row; the overlay panel is anchored to the row and scrolls with the page. Below the sm breakpoint the overlay does not apply and the content stays in the flow of the page. | `boolean`             | `false`     |


## Events

| Event      | Description                                                                             | Type                                |
| ---------- | --------------------------------------------------------------------------------------- | ----------------------------------- |
| `dsoClose` | Emitted when the user dismisses the overlay: a click on the backdrop or the Escape key. | `CustomEvent<GridColumnCloseEvent>` |


## Slots

| Slot | Description                              |
| ---- | ---------------------------------------- |
|      | The default slot for the column content. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
