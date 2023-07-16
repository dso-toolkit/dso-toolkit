# `<dso-expandable>`

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                     | Type                   | Default     |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `enableAnimation` | `enable-animation` | Set to `true` to show the content animated.                                                                                                     | `boolean`              | `false`     |
| `minimumHeight`   | `minimum-height`   | When enableAnimation is set to `true`, this property specifies the height of this element at which the animation will expand from / collapse to | `number \| undefined`  | `undefined` |
| `open`            | `open`             | Set to `true` to expand the content.                                                                                                            | `boolean \| undefined` | `undefined` |


## Events

| Event                       | Description                                                        | Type                                       |
| --------------------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| `dsoExpandableAnimationEnd` | Fired when the animation ends. Only when `enableAnimation = true`. | `CustomEvent<ExpandableAnimationEndEvent>` |


## Dependencies

### Used by

 - [dso-accordion-section](../accordion/components)
 - [dso-annotation-output](../annotation-output)
 - [dso-expandable-heading](../expandable-heading)

### Graph
```mermaid
graph TD;
  dso-accordion-section --> dso-expandable
  dso-annotation-output --> dso-expandable
  dso-expandable-heading --> dso-expandable
  style dso-expandable fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
