# `<dso-viewer-grid>`

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                       | Type                                           | Default     |
| ------------------- | --------------------- | ----------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `activeTab`         | `active-tab`          | Set active tab in tab view.                                       | `"document" \| "map" \| "search" \| undefined` | `undefined` |
| `documentPanelOpen` | `document-panel-open` | Set to true when document panel should show.                      | `boolean`                                      | `false`     |
| `documentPanelSize` | `document-panel-size` | Size of the panel when component loads.  Default size is `large`. | `"large" \| "medium" \| "small"`               | `"large"`   |
| `filterPanelOpen`   | `filter-panel-open`   | Set to true when filter panel should show.                        | `boolean`                                      | `false`     |
| `filterPanelTitle`  | `filter-panel-title`  | The title of the filter panel                                     | `string \| undefined`                          | `undefined` |
| `mainPanelExpanded` | `main-panel-expanded` | Set to show main panel expanded.                                  | `boolean`                                      | `false`     |
| `mainPanelHidden`   | `main-panel-hidden`   | Set to hide the main panel.                                       | `boolean`                                      | `false`     |
| `mainSize`          | `main-size`           | Size of the panel when component loads.  Default size is `large`. | `"large" \| "medium" \| "small"`               | `"large"`   |
| `overlayOpen`       | `overlay-open`        | Set to true when overlay should show.                             | `boolean`                                      | `false`     |


## Events

| Event                                    | Description                                                                                                                    | Type                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `dsoActiveTabSwitch`                     | Emitted when user applies filter panel options.                                                                                | `CustomEvent<ViewerGridActiveTabSwitchEvent>`        |
| `dsoCloseFilterPanel`                    | Emitted when user wants to close the filter panel.                                                                             | `CustomEvent<ViewerGridCloseFilterPanelEvent>`       |
| `dsoCloseOverlay`                        | Emitted when user wants to close the overlay.                                                                                  | `CustomEvent<ViewerGridCloseOverlayEvent>`           |
| `dsoDocumentPanelSizeChange`             | Emitted on interaction with sizing buttons.                                                                                    | `CustomEvent<ViewerGridChangeSizeEvent>`             |
| `dsoDocumentPanelSizeChangeAnimationEnd` | Emitted after main size animation.                                                                                             | `CustomEvent<ViewerGridChangeSizeAnimationEndEvent>` |
| `dsoMainPanelToggle`                     | Emitted when the user toggles the visibility of the main panel.  Also emitted by scripting when the panels do not fit anymore. | `CustomEvent<ViewerGridMainToggleEvent>`             |
| `dsoMainSizeChangeAnimationEnd`          | Emitted after main size animation.                                                                                             | `CustomEvent<ViewerGridChangeSizeAnimationEndEvent>` |


## Slots

| Slot               | Description                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `"document-panel"` |                                                                                             |
| `"filter-panel"`   |                                                                                             |
| `"main"`           |                                                                                             |
| `"map"`            |                                                                                             |
| `"overlay"`        |                                                                                             |
| `"top-bar"`        | Een slot die bovenaan de viewer over de hele breedte kan worden gevuld met bijv een banner. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
