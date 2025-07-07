# `<dso-base-layers>`

Private component, do not use.

<!-- Auto Generated dso-toolkit -->

## Types

### BaseLayer

```typescript
export interface BaseLayer {
  id: number;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  info?: string;
}
```

<!-- src/components/map-base-layers/map-base-layers.interfaces.ts::BaseLayer -->

### BaseLayerChangeEvent

```typescript
export interface BaseLayerChangeEvent {
  activeBaseLayer: BaseLayer;
}
```

<!-- src/components/map-base-layers/map-base-layers.interfaces.ts::BaseLayerChangeEvent -->

<!-- Auto Generated Below -->

## Properties

| Property                  | Attribute     | Description                                                           | Type          | Default     |
| ------------------------- | ------------- | --------------------------------------------------------------------- | ------------- | ----------- |
| `baseLayers` _(required)_ | `base-layers` | The base layers.                                                      | `BaseLayer[]` | `undefined` |
| `group`                   | `group`       | To group the overlays together. Generally the default value suffices. | `string`      | `uuidv4()`  |

## Events

| Event                | Description                                            | Type                                |
| -------------------- | ------------------------------------------------------ | ----------------------------------- |
| `dsoBaseLayerChange` | Emitted when the user checks or unchecks a base layer. | `CustomEvent<BaseLayerChangeEvent>` |

## Dependencies

### Depends on

- [dso-selectable](../selectable)

### Graph

```mermaid
graph TD;
  dso-map-base-layers --> dso-selectable
  dso-selectable --> dso-info-button
  dso-selectable --> dso-info
  dso-info-button --> dso-icon
  dso-info --> dso-icon
  style dso-map-base-layers fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
