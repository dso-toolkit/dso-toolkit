# `<dso-ozon-content>`

Het Ozon Content component verwerkt XML die uit de Ozon API komt.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                     | Type                                                              | Default     |
| ------------- | -------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| `content`     | `content`      | The XML to be rendered.                                                                                         | `XMLDocument \| string \| undefined`                              | `undefined` |
| `inline`      | `inline`       | Setting this property creates dso-ozon-content as inline element instead of a block element.                    | `boolean`                                                         | `false`     |
| `mark`        | `mark`         | To mark text.                                                                                                   | `((text: string) => OzonContentText[] \| undefined) \| undefined` | `undefined` |
| `urlResolver` | `url-resolver` | A UrlResolver that will be called for all STOP elements that render to HTML5 elements with external references. | `OzonContentUrlResolver \| undefined`                             | `undefined` |


## Events

| Event                             | Description                                                                         | Type                                             |
| --------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| `dsoAnchorClick`                  | Emitted when `<a>` that is created through <IntIoRef> or <IntRef> is clicked.       | `CustomEvent<OzonContentAnchorClickEvent>`       |
| `dsoClick`                        | Emitted when an interactive element is clicked, except for <IntIoRef> and <IntRef>. | `CustomEvent<OzonContentClickBaseEvent<"Kop">>`  |
| `dsoOzonContentMarkItemHighlight` | Emitted when a marked item is highlighted.                                          | `CustomEvent<OzonContentMarkItemHighlightEvent>` |


## Dependencies

### Used by

 - [dso-document-component](../document-component)

### Depends on

- [dso-icon](../icon)
- [dso-image-overlay](../image-overlay)
- [dso-tooltip](../tooltip)
- [dso-table](../table)

### Graph
```mermaid
graph TD;
  dso-ozon-content --> dso-icon
  dso-ozon-content --> dso-image-overlay
  dso-ozon-content --> dso-tooltip
  dso-ozon-content --> dso-table
  dso-image-overlay --> dso-icon
  dso-table --> dso-icon
  dso-document-component --> dso-ozon-content
  style dso-ozon-content fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
