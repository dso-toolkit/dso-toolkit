# `<dso-tree-view>`

The collection property of the Tree View is an array of `TreeViewItem`. The collection is an immutable array containing the state of the Tree View that should be managed _outside_ of Tree View.

### State management

When the user interacts with the Tree View, events are emitted when a node is opened, closed or clicked. The Tree View events will provide the complete path of TreeViewItems from the root to the item that is emitting the event. The consumer of the Tree View should update the TreeView's collection on the open and close events with the new state.

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

#### Parameters

| Name   | Type             | Description |
| ------ | ---------------- | ----------- |
| `path` | `TreeViewItem[]` |             |

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
  dso-progress-indicator --> dso-icon
  style dso-tree-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
