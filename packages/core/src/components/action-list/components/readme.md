# `<dso-action-list-item>`



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute    | Description                                     | Type                  | Default     |
| ------------------- | ------------ | ----------------------------------------------- | --------------------- | ----------- |
| `divider`           | `divider`    | Places a dashed line at the bottom of the item. | `boolean`             | `false`     |
| `flowLine`          | `flow-line`  | Show flow line to next step                     | `boolean`             | `false`     |
| `itemTitle`         | `item-title` | The title of the item.                          | `string \| undefined` | `undefined` |
| `step` _(required)_ | `step`       | The step of the Action List Item.               | `number`              | `undefined` |
| `warning`           | `warning`    | When there is a warning.                        | `boolean`             | `false`     |


## Dependencies

### Depends on

- [dso-icon](../../icon)

### Graph
```mermaid
graph TD;
  dso-action-list-item --> dso-icon
  style dso-action-list-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
