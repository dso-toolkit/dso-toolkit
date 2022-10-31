# `<dso-tree-view>`

The collection property of the Tree View is an array of `TreeViewItem`. The collection is an immutable array containing the state of the Tree View that should be managed _outside_ of Tree View.

## TreeViewItem
```typescript
interface TreeViewItem {
  id: string;
  label: string;
  hasItems: boolean;
  items?: TreeViewItem[];
  open?: boolean;
  loading?: boolean;
  icons?: TreeViewItemIcon[];
}
```

| Property                  | Description                     | Type                     | Default     |
| ------------------------- | ------------------------------- | ------------------------ | ----------- |
| `id` _(required)_         | The id of the item | `string` | `undefined` |
| `label` _(required)_      | The label of the item | `string` | `undefined` |
| `hasItems` _(required)_   | Indicates whether the item has children | `boolean` | `false` |
| `items`                   | The array of child items | `TreeViewItem[]` | `undefined` |
| `open`                    | Indicates whether the node is open and child items are shown | `boolean` | `false` |
| `loading`                 | Indicates the node is loading child items | `boolean` | `false` |
| `active`                  | Indicates if the node is the active item | `boolean` | `false` |
| `icons`                   | An optional array of icons | `TreeViewItemIcon[]` | `undefined` |


## TreeViewPointerEvent

```typescript
export interface TreeViewPointerEvent {
  path: TreeViewItem[],
  originalEvent: MouseEvent
}
```

| Property                  | Description                     | Type                     |
| ------------------------- | ------------------------------- | ------------------------ |
| `path`                    | The full path to the clicked item | `TreeViewItem[]` |
| `originalEvent`           | The original browser click event | `MouseEvent` |


## TreeView

### State management

When the user interacts with the Tree View, events are emitted when a node is opened, closed or clicked. The Tree View events will provide the complete path of TreeViewItems from the root to the item that is emitting the event.
The consumer of the Tree View should update the TreeView's collection on the open and close events with the new state.

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute | Description                     | Type             | Default     |
| ------------------------- | --------- | ------------------------------- | ---------------- | ----------- |
| `collection` _(required)_ | --        | The collection of TreeViewItems | `TreeViewItem[]` | `undefined` |


## Events

| Event          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Type                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `dsoClickItem` | Emitted when a tree view item is clicked. The `detail` property of the `CustomEvent` will contain an object with: `path` = the complete path of TreeViewItems from the root to the item that is emitting the clicked event. `originalEvent` = the original click event. The consumer of the event is responsible for updating the TreeView's collection (usually set the active state on the last TreeViewItem in path and clear all other active item states). | `CustomEvent<TreeViewPointerEvent>` |
| `dsoCloseItem` | Emitted when a tree view item is closed. The `detail` property of the `CustomEvent` will contain the complete path of TreeViewItems from the root to the item that is emitting the close event. The consumer of the event is responsible for updating the TreeView's collection (usually set the closed state on the last TreeViewItem in path).                                                                                                                | `CustomEvent<TreeViewItem[]>`       |
| `dsoOpenItem`  | Emitted when a tree view item is opened. The `detail` property of the `CustomEvent` will contain the complete path of TreeViewItems from the root to the item that is emitting the open event. The consumer of the event is responsible for updating the TreeView's collection (usually set the open state on the last TreeViewItem in path).                                                                                                                   | `CustomEvent<TreeViewItem[]>`       |


## Methods

### `focusItem(path: TreeViewItem[]) => Promise<boolean>`

Set focus on the last item in the specified path.
The consumer is responsible for providing a TreeView collection where the last item is visible.

#### Returns

Type: `Promise<boolean>`

Whether the item was found.


## Dependencies

### Depends on

- [dso-icon](../icon)
- [dso-progress-indicator](../progress-indicator)

### Graph
```mermaid
graph TD;
  dso-tree-view --> dso-icon
  dso-tree-view --> dso-progress-indicator
  style dso-tree-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
