# dsot-document-component-demo



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                      | Type                  | Default     |
| ------------- | -------------- | ------------------------------------------------ | --------------------- | ----------- |
| `jsonFile`    | `json-file`    | Name of the file to load.                        | `string \| undefined` | `undefined` |
| `openDefault` | `open-default` | The default state for all Document Components.   | `boolean`             | `false`     |
| `showCanvas`  | `show-canvas`  | Show canvas to where Document Component extends. | `boolean`             | `false`     |


## Events

| Event                        | Description                                                | Type                                                        |
| ---------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| `dsotOzonContentAnchorClick` | To demo user interacting with IntRef or IntIoRef elements. | `CustomEvent<DocumentComponentOzonContentAnchorClickEvent>` |


## Dependencies

### Depends on

- [dso-document-component](../document-component)
- [dso-annotation-output](../annotation-output)
- [dso-slide-toggle](../slide-toggle)
- [dso-responsive-element](../responsive-element)

### Graph
```mermaid
graph TD;
  dsot-document-component-demo --> dso-document-component
  dsot-document-component-demo --> dso-annotation-output
  dsot-document-component-demo --> dso-slide-toggle
  dsot-document-component-demo --> dso-responsive-element
  dso-document-component --> dso-icon
  dso-document-component --> dso-ozon-content
  dso-document-component --> dso-badge
  dso-document-component --> dso-tooltip
  dso-document-component --> dso-label
  dso-document-component --> dso-annotation-button
  dso-document-component --> dso-alert
  dso-ozon-content --> dso-icon
  dso-ozon-content --> dso-image-overlay
  dso-ozon-content --> dso-tooltip
  dso-ozon-content --> dso-table
  dso-image-overlay --> dso-icon
  dso-table --> dso-icon
  dso-label --> dso-icon
  dso-label --> dso-tooltip
  dso-annotation-button --> dso-icon
  dso-alert --> dso-icon
  dso-annotation-output --> dso-responsive-element
  dso-annotation-output --> dso-expandable
  dso-annotation-output --> dso-icon
  style dsot-document-component-demo fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
