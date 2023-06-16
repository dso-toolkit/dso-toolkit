# `<dso-annotation-output>`

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute           | Description                                                                        | Type                  | Default     |
| ------------------------- | ------------------- | ---------------------------------------------------------------------------------- | --------------------- | ----------- |
| `annotationPrefix`        | `annotation-prefix` | This text will be displayed above the annotation-output when opened                | `string \| undefined` | `undefined` |
| `identifier` _(required)_ | `identifier`        | The annotation-button that toggles this component should have the same identifier. | `string`              | `undefined` |


## Events

| Event       | Description                                                          | Type                                 |
| ----------- | -------------------------------------------------------------------- | ------------------------------------ |
| `dsoToggle` | This event is emitted when the user activates the Annotation Button. | `CustomEvent<AnnotationToggleEvent>` |


## Dependencies

### Depends on

- [dso-responsive-element](../responsive-element)
- [dso-expandable](../expandable)
- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-annotation-output --> dso-responsive-element
  dso-annotation-output --> dso-expandable
  dso-annotation-output --> dso-icon
  style dso-annotation-output fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
