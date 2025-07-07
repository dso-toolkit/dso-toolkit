# `<dso-viewer-grid>`

<!-- Auto Generated dso-toolkit -->

## Types

### ViewerGridActiveTabSwitchEvent

```typescript
export interface ViewerGridActiveTabSwitchEvent {
  tab: ViewerGridTab;
}
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridActiveTabSwitchEvent -->

### ViewerGridChangeSizeAnimationEndEvent

```typescript
export interface ViewerGridChangeSizeAnimationEndEvent {
  currentSize: ViewerGridPanelSize;
}
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridChangeSizeAnimationEndEvent -->

### ViewerGridChangeSizeEvent

```typescript
export interface ViewerGridChangeSizeEvent {
  currentSize: ViewerGridPanelSize;
  nextSize: ViewerGridPanelSize;
}
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridChangeSizeEvent -->

### ViewerGridCloseFilterPanelEvent

```typescript
export interface ViewerGridCloseFilterPanelEvent {
  originalEvent: MouseEvent | Event;
}
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridCloseFilterPanelEvent -->

### ViewerGridCloseOverlayEvent

```typescript
export interface ViewerGridCloseOverlayEvent {
  originalEvent: MouseEvent | Event;
}
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridCloseOverlayEvent -->

### ViewerGridMainExpandEvent

```typescript
export interface ViewerGridMainExpandEvent {
  expand: boolean;
}
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridMainExpandEvent -->

### ViewerGridMainToggleEvent

```typescript
export interface ViewerGridMainToggleEvent {
  hide: boolean;
}
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridMainToggleEvent -->

### ViewerGridPanelSize

```typescript
export type ViewerGridPanelSize = "small" | "medium" | "large";
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridPanelSize -->

### ViewerGridTab

```typescript
"document" | "map" | "search";
```

<!-- src/components/viewer-grid/viewer-grid.interfaces.ts::ViewerGridTab -->

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute             | Description                                                      | Type                                           | Default     |
| ------------------- | --------------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `activeTab`         | `active-tab`          | Set active tab in tab view.                                      | `"document" \| "map" \| "search" \| undefined` | `undefined` |
| `documentPanelOpen` | `document-panel-open` | Set to true when document panel should show.                     | `boolean`                                      | `false`     |
| `documentPanelSize` | `document-panel-size` | Size of the panel when component loads. Default size is `large`. | `"large" \| "medium" \| "small"`               | `"large"`   |
| `filterPanelOpen`   | `filter-panel-open`   | Set to true when filter panel should show.                       | `boolean`                                      | `false`     |
| `filterPanelTitle`  | `filter-panel-title`  | The title of the filter panel                                    | `string \| undefined`                          | `undefined` |
| `mainPanelExpanded` | `main-panel-expanded` | Set to show main panel expanded.                                 | `boolean`                                      | `false`     |
| `mainPanelHidden`   | `main-panel-hidden`   | Set to hide the main panel.                                      | `boolean`                                      | `false`     |
| `mainSize`          | `main-size`           | Size of the panel when component loads. Default size is `large`. | `"large" \| "medium" \| "small"`               | `"large"`   |
| `overlayOpen`       | `overlay-open`        | Set to true when overlay should show.                            | `boolean`                                      | `false`     |

## Events

| Event                                    | Description                                                                                                                   | Type                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `dsoActiveTabSwitch`                     | Emitted when user applies filter panel options.                                                                               | `CustomEvent<ViewerGridActiveTabSwitchEvent>`        |
| `dsoCloseFilterPanel`                    | Emitted when user wants to close the filter panel.                                                                            | `CustomEvent<ViewerGridCloseFilterPanelEvent>`       |
| `dsoCloseOverlay`                        | Emitted when user wants to close the overlay.                                                                                 | `CustomEvent<ViewerGridCloseOverlayEvent>`           |
| `dsoDocumentPanelSizeChange`             | Emitted on interaction with sizing buttons.                                                                                   | `CustomEvent<ViewerGridChangeSizeEvent>`             |
| `dsoDocumentPanelSizeChangeAnimationEnd` | Emitted after main size animation.                                                                                            | `CustomEvent<ViewerGridChangeSizeAnimationEndEvent>` |
| `dsoMainPanelExpand`                     | Emitted when the user wants to expand the main panel.                                                                         | `CustomEvent<ViewerGridMainExpandEvent>`             |
| `dsoMainPanelToggle`                     | Emitted when the user toggles the visibility of the main panel. Also emitted by scripting when the panels do not fit anymore. | `CustomEvent<ViewerGridMainToggleEvent>`             |
| `dsoMainSizeChangeAnimationEnd`          | Emitted after main size animation.                                                                                            | `CustomEvent<ViewerGridChangeSizeAnimationEndEvent>` |

## Slots

| Slot               | Description                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `"document-panel"` |                                                                                             |
| `"filter-panel"`   |                                                                                             |
| `"main"`           |                                                                                             |
| `"map"`            |                                                                                             |
| `"overlay"`        |                                                                                             |
| `"top-bar"`        | Een slot die bovenaan de viewer over de hele breedte kan worden gevuld met bijv een banner. |

---

_Built with [StencilJS](https://stenciljs.com/)_
