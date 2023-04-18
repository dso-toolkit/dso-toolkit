# `<dso-scroll-container>`

<!-- Auto Generated Below -->


## Events

| Event                     | Description                                                 | Type                                                                               |
| ------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `dsoScrollContainerEvent` | Event emitted when the scrollbar has reached top or bottom. | `CustomEvent<{ scrollEnd: false \| "top" \| "bottom"; element: HTMLDivElement; }>` |


## Methods

### `setScrollState(target: HTMLDivElement) => Promise<void>`

Internal method. **Do not use!**

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [dso-map-controls](../map-controls)

### Graph
```mermaid
graph TD;
  dso-map-controls --> dso-scroll-container
  style dso-scroll-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
