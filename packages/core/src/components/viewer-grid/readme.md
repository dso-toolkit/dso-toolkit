# `<dso-viewer-grid>`

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                       | Type                                           | Default     |
| ------------------- | --------------------- | ----------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `activeTab`         | `active-tab`          | Set active tab in tab view.                                       | `"document" \| "map" \| "search" \| undefined` | `undefined` |
| `documentPanelOpen` | `document-panel-open` | Set to true when document panel should show.                      | `boolean`                                      | `false`     |
| `documentPanelSize` | `document-panel-size` | Size of the panel when component loads.  Default size is `large`. | `"large" \| "medium" \| "small"`               | `"large"`   |
| `filterpanelOpen`   | `filterpanel-open`    | Set to true when filterpanel should show.                         | `boolean`                                      | `false`     |
| `filterpanelTitle`  | `filterpanel-title`   | The title of the Filterpanel                                      | `string \| undefined`                          | `undefined` |
| `mainPanelExpanded` | `main-panel-expanded` | Set to show main panel expanded.                                  | `boolean`                                      | `false`     |
| `mainPanelHidden`   | `main-panel-hidden`   | Set to hide the main panel.                                       | `boolean`                                      | `false`     |
| `mainSize`          | `main-size`           | Size of the panel when component loads.  Default size is `large`. | `"large" \| "medium" \| "small"`               | `"large"`   |
| `overlayOpen`       | `overlay-open`        | Set to true when overlay should show.                             | `boolean`                                      | `false`     |


## Events

| Event                                    | Description                                                                                                                    | Type                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `dsoActiveTabSwitch`                     | Emitted when user applies filterpanel options.                                                                                 | `CustomEvent<ViewerGridActiveTabSwitchEvent>`        |
| `dsoCloseFilterpanel`                    | Emitted when user wants to close the filterpanel.                                                                              | `CustomEvent<ViewerGridCloseFilterpanelEvent>`       |
| `dsoCloseOverlay`                        | Emitted when user wants to close the overlay.                                                                                  | `CustomEvent<ViewerGridCloseOverlayEvent>`           |
| `dsoDocumentPanelSizeChange`             | Emitted on interaction with sizing buttons.                                                                                    | `CustomEvent<ViewerGridChangeSizeEvent>`             |
| `dsoDocumentPanelSizeChangeAnimationEnd` | Emitted after main size animation.                                                                                             | `CustomEvent<ViewerGridChangeSizeAnimationEndEvent>` |
| `dsoMainPanelExpand`                     | Emitted when the user wants to expand the main panel.                                                                          | `CustomEvent<ViewerGridMainExpandEvent>`             |
| `dsoMainPanelToggle`                     | Emitted when the user toggles the visibility of the main panel.  Also emitted by scripting when the panels do not fit anymore. | `CustomEvent<ViewerGridMainToggleEvent>`             |
| `dsoMainSizeChangeAnimationEnd`          | Emitted after main size animation.                                                                                             | `CustomEvent<ViewerGridChangeSizeAnimationEndEvent>` |


## Slots

| Slot               | Description                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `"document-panel"` |                                                                                             |
| `"filterpanel"`    |                                                                                             |
| `"main"`           |                                                                                             |
| `"map"`            |                                                                                             |
| `"overlay"`        |                                                                                             |
| `"top-bar"`        | Een slot die bovenaan de viewer over de hele breedte kan worden gevuld met bijv een banner. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
