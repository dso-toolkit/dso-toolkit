# `<dso-map-layer>`

<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute     | Description                                                                                                             | Type                                    | Default     |
| -------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `activatable`              | `activatable` | A boolean to indicate if the Map Layer is capable of being activated. When `true` a Slide Toggle displays on the right. | `boolean`                               | `false`     |
| `active`                   | `active`      | An optional boolean indicating whether the Map Layer is active.                                                         | `boolean \| undefined`                  | `undefined` |
| `wijzigactie` _(required)_ | `wijzigactie` | An optional wijzigactie value for revision indication.                                                                  | `"verwijder" \| "voegtoe" \| undefined` | `undefined` |


## Events

| Event             | Description                                               | Type                                     |
| ----------------- | --------------------------------------------------------- | ---------------------------------------- |
| `dsoActiveChange` | Emitted when user activates or deactivates the Map Layer. | `CustomEvent<MapLayerActiveChangeEvent>` |


## Slots

| Slot      | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
|           | The dso-map-layer-object elements. These should be direct children of the dso-map-layer element. |
| `"label"` | An optional slot for badges or labels next to the Map Layer name.                                |
| `"name"`  | The name of the Map Layer.                                                                       |


## Dependencies

### Depends on

- [dso-slide-toggle](../slide-toggle)

### Graph
```mermaid
graph TD;
  dso-map-layer --> dso-slide-toggle
  style dso-map-layer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
