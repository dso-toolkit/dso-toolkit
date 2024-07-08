# `<dso-alert>`

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute    | Description                                                                                                          | Type                                          | Default     |
| --------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `compact`             | `compact`    | Show alert as compact variant (without icon)                                                                         | `boolean \| undefined`                        | `undefined` |
| `roleAlert`           | `role-alert` | Whether or not to show the role attribute with value "alert". To control the tooltip add the `role-alert` attribute. | `boolean \| undefined`                        | `undefined` |
| `status` _(required)_ | `status`     | Set status of alert                                                                                                  | `"error" \| "info" \| "success" \| "warning"` | `undefined` |


## Dependencies

### Used by

 - [dso-document-component](../document-component)

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-alert --> dso-icon
  dso-document-component --> dso-alert
  style dso-alert fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
