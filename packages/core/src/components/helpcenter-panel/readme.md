# `<dso-helpcenter-panel>`

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute | Description                                                 | Type     | Default        |
| ------------------ | --------- | ----------------------------------------------------------- | -------- | -------------- |
| `label`            | `label`   | The label on the help button that activates the Helpcenter. | `string` | `"Hulp nodig"` |
| `url` _(required)_ | `url`     | The URL that's loaded when the Helpcenter opens.            | `string` | `undefined`    |


## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-helpcenter-panel --> dso-icon
  style dso-helpcenter-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
