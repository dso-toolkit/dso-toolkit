# `<dso-responsive-element>`

<!-- Auto Generated Below -->


## Events

| Event           | Description                   | Type                                          |
| --------------- | ----------------------------- | --------------------------------------------- |
| `dsoSizeChange` | Emitted when size has changed | `CustomEvent<"large" \| "medium" \| "small">` |


## Methods

### `getSize() => Promise<ResponsiveElementSize>`

The current size

#### Returns

Type: `Promise<ResponsiveElementSize>`




## Dependencies

### Used by

 - [dso-pagination](../pagination)
 - [dso-project-item](../project-item)
 - [dsot-document-component-demo](../document-component-demo)

### Graph
```mermaid
graph TD;
  dso-pagination --> dso-responsive-element
  dso-project-item --> dso-responsive-element
  dsot-document-component-demo --> dso-responsive-element
  style dso-responsive-element fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
