# `<dso-skiplink>`



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description                               | Type                  | Default     |
| -------------------- | --------- | ----------------------------------------- | --------------------- | ----------- |
| `label` _(required)_ | `label`   | link text                                 | `string \| undefined` | `undefined` |
| `to` _(required)_    | `to`      | The location to which the skiplink links. | `string \| undefined` | `undefined` |


## Events

| Event              | Description                           | Type                              |
| ------------------ | ------------------------------------- | --------------------------------- |
| `dsoSkiplinkClick` | Emitted when the Skiplink is clicked. | `CustomEvent<SkiplinkClickEvent>` |


## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-skiplink --> dso-icon
  style dso-skiplink fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
