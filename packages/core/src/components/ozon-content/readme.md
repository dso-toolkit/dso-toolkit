# `<dso-ozon-content>`

Het Ozon Content component verwerkt XML die uit de Ozon API komt.

## Custom Event interfaces

```typescript
export interface OzonContentAnchorClickEvent {
  node: string;
  href: string;
  documentComponent: string;
  originalEvent: MouseEvent;
}
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                  | Type                  | Default     |
| --------- | --------- | -------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `content` | `content` | The XML to be rendered.                                                                      | `string \| undefined` | `undefined` |
| `inline`  | `inline`  | Setting this property creates dso-ozon-content as inline element instead of a block element. | `boolean`             | `false`     |


## Events

| Event            | Description                    | Type                                       |
| ---------------- | ------------------------------ | ------------------------------------------ |
| `dsoAnchorClick` | Emitted when `<a>` is clicked. | `CustomEvent<OzonContentAnchorClickEvent>` |


## Dependencies

### Used by

 - [dso-document-component](../document-component)

### Graph
```mermaid
graph TD;
  dso-document-component --> dso-ozon-content
  style dso-ozon-content fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
