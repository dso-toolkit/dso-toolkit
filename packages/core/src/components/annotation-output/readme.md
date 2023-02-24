# `<dso-annotation-output>`

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute           | Description | Type                  | Default     |
| ------------------------- | ------------------- | ----------- | --------------------- | ----------- |
| `annotationPrefix`        | `annotation-prefix` |             | `string \| undefined` | `undefined` |
| `identifier` _(required)_ | `identifier`        |             | `string`              | `undefined` |


## Events

| Event                 | Description | Type                                 |
| --------------------- | ----------- | ------------------------------------ |
| `dsoToggleAnnotation` |             | `CustomEvent<AnnotationToggleEvent>` |


## Methods

### `toggleAnnotation(e: MouseEvent, identifier: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [dso-expandable](../expandable)
- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-annotation-output --> dso-expandable
  dso-annotation-output --> dso-icon
  style dso-annotation-output fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
