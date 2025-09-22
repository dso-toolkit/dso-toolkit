# `<dsot-document-component-demo>`



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                   | Description                                                                                                     | Type                                  | Default      |
| ------------------------ | --------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------ |
| `jsonFile`               | `json-file`                 | Name of the file to load.                                                                                       | `string \| undefined`                 | `undefined`  |
| `mode`                   | `mode`                      | The mode of the Document Component. One of "document" or "table-of-contents". Defaults to "document"            | `"document" \| "table-of-contents"`   | `"document"` |
| `openDefault`            | `open-default`              | The default state for all Document Components.                                                                  | `boolean`                             | `false`      |
| `ozonContentUrlResolver` | `ozon-content-url-resolver` | A UrlResolver that will be called for all STOP elements that render to HTML5 elements with external references. | `OzonContentUrlResolver \| undefined` | `undefined`  |
| `showCanvas`             | `show-canvas`               | Show canvas to where Document Component extends.                                                                | `boolean`                             | `false`      |


## Events

| Event                        | Description                                                       | Type                                                        |
| ---------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| `dsotOzonContentAnchorClick` | To demo user interacting with IntRef or IntIoRef elements.        | `CustomEvent<DocumentComponentOzonContentAnchorClickEvent>` |
| `dsotTableOfContentsClick`   | To demo user interacting the heading in mode="table-of-contents". | `CustomEvent<DocumentComponentTableOfContentsClickEvent>`   |


## Dependencies

### Depends on

- [dso-document-component](../document-component)
- [dso-annotation-locatie](../annotation/annotation-locatie)
- [dso-responsive-element](../responsive-element)

### Graph
```mermaid
graph TD;
  dsot-document-component-demo --> dso-document-component
  dsot-document-component-demo --> dso-annotation-locatie
  dsot-document-component-demo --> dso-responsive-element
  dso-document-component --> dso-icon-button
  dso-document-component --> dso-ozon-content
  dso-document-component --> dso-badge
  dso-document-component --> dso-tooltip
  dso-document-component --> dso-label
  dso-document-component --> dso-panel
  dso-document-component --> dso-alert
  dso-icon-button --> dso-icon
  dso-ozon-content --> dso-icon
  dso-ozon-content --> dso-image-overlay
  dso-ozon-content --> dso-tooltip
  dso-ozon-content --> dso-table
  dso-image-overlay --> dso-icon-button
  dso-table --> dso-icon
  dso-label --> dso-icon-button
  dso-label --> dso-tooltip
  dso-panel --> dso-icon-button
  dso-alert --> dso-icon
  dso-alert --> dso-icon-button
  dso-annotation-locatie --> dso-renvooi
  dso-annotation-locatie --> dso-slide-toggle
  dso-annotation-locatie --> dso-label
  style dsot-document-component-demo fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
