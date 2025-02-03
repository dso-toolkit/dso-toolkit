# `<dso-viewer-grid>`

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                     | Type                                                     | Default     |
| ------------------- | --------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------- |
| `activeTab`         | `active-tab`          | Set active tab in tab view.                                                     | `"document" \| "main" \| "map" \| "search" \| undefined` | `undefined` |
| `documentPanelOpen` | `document-panel-open` | **VDK only.** Set to true when document panel should show.                      | `boolean`                                                | `false`     |
| `documentPanelSize` | `document-panel-size` | **VDK only.** Size of the panel when component loads.  Default size is `large`. | `"large" \| "medium" \| "small"`                         | `"large"`   |
| `filterpanelOpen`   | `filterpanel-open`    | Set to true when filterpanel should show.                                       | `boolean`                                                | `false`     |
| `filterpanelTitle`  | `filterpanel-title`   | **VDK only.** The title of the Filterpanel                                      | `string \| undefined`                                    | `undefined` |
| `mainPanelExpanded` | `main-panel-expanded` | **VDK only.** Set to show main panel expanded.                                  | `boolean`                                                | `false`     |
| `mainPanelHidden`   | `main-panel-hidden`   | **VDK only.** Set to hide the main panel.                                       | `boolean`                                                | `false`     |
| `mainSize`          | `main-size`           | Size of the panel when component loads.  Default size is `large`.               | `"large" \| "medium" \| "small"`                         | `"large"`   |
| `mode`              | `mode`                | VRK or VDK implementation.                                                      | `"vdk" \| "vrk"`                                         | `"vrk"`     |
| `overlayOpen`       | `overlay-open`        | Set to true when overlay should show.                                           | `boolean`                                                | `false`     |


## Events

| Event                                    | Description                                                                                                                                  | Type                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `dsoActiveTabSwitch`                     | Emitted when user applies filterpanel options.                                                                                               | `CustomEvent<ViewerGridActiveTabSwitchEvent>`        |
| `dsoCloseFilterpanel`                    | **VDK only.** Emitted when user wants to close the filterpanel.                                                                              | `CustomEvent<ViewerGridCloseFilterpanelEvent>`       |
| `dsoCloseOverlay`                        | Emitted when user wants to close the overlay.                                                                                                | `CustomEvent<ViewerGridCloseOverlayEvent>`           |
| `dsoDocumentPanelSizeChange`             | **VDK only.** Emitted on interaction with sizing buttons.                                                                                    | `CustomEvent<ViewerGridChangeSizeEvent>`             |
| `dsoDocumentPanelSizeChangeAnimationEnd` | **VDK only.** Emitted after main size animation.                                                                                             | `CustomEvent<ViewerGridChangeSizeAnimationEndEvent>` |
| `dsoFilterpanelApply`                    | Emitted when user applies filterpanel options.                                                                                               | `CustomEvent<ViewerGridFilterpanelApplyEvent>`       |
| `dsoFilterpanelCancel`                   | Emitted when user cancels filterpanel.                                                                                                       | `CustomEvent<ViewerGridFilterpanelCancelEvent>`      |
| `dsoMainPanelExpand`                     | **VDK only.** Emitted when the user wants to expand the main panel.                                                                          | `CustomEvent<ViewerGridMainExpandEvent>`             |
| `dsoMainPanelToggle`                     | **VDK only.** Emitted when the user toggles the visibility of the main panel.  Also emitted by scripting when the panels do not fit anymore. | `CustomEvent<ViewerGridMainToggleEvent>`             |
| `dsoMainSizeChange`                      | Emitted on interaction with sizing buttons.                                                                                                  | `CustomEvent<ViewerGridChangeSizeEvent>`             |
| `dsoMainSizeChangeAnimationEnd`          | Emitted after main size animation.                                                                                                           | `CustomEvent<ViewerGridChangeSizeAnimationEndEvent>` |


## Slots

| Slot               | Description |
| ------------------ | ----------- |
| `"document-panel"` | VDK only    |
| `"filterpanel"`    |             |
| `"main"`           |             |
| `"map"`            |             |
| `"overlay"`        |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
