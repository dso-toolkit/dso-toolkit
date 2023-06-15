# `<dso-responsive-element>`

<!-- Auto Generated Below -->


## Events

| Event           | Description | Type                                          |
| --------------- | ----------- | --------------------------------------------- |
| `dsoSizeChange` |             | `CustomEvent<"large" \| "medium" \| "small">` |


## Methods

### `getSize() => Promise<ResponsiveElementSize>`



#### Returns

Type: `Promise<ResponsiveElementSize>`

The current size


## Dependencies

### Used by

 - [dso-annotation-output](../annotation-output)
 - [dso-pagination](../pagination)

### Graph
```mermaid
graph TD;
  dso-annotation-output --> dso-responsive-element
  dso-pagination --> dso-responsive-element
  style dso-responsive-element fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
