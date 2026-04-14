# `<dso-table>`

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                                 | Type      | Default |
| --------- | ---------- | ------------------------------------------- | --------- | ------- |
| `noModal` | `no-modal` | Prevents the table being opened in a modal. | `boolean` | `false` |


## Dependencies

### Used by

 - [dso-ozon-content](../ozon-content)

### Depends on

- [dso-modal](../modal)
- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-table --> dso-modal
  dso-table --> dso-icon
  dso-modal --> dso-icon-button
  dso-modal --> dso-scrollable
  dso-icon-button --> dso-icon
  dso-ozon-content --> dso-table
  style dso-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
