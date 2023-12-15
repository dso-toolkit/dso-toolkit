# dso-card



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                      | Type                  | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `clickable`  | `clickable`   | Whether or not the Card is clickable.                                                            | `boolean`             | `true`      |
| `href`       | `href`        | The URL to which the Card heading links. If the Card is not clickable, this property is ignored. | `string \| undefined` | `undefined` |
| `imageShape` | `image-shape` | Presentation of image in header.  - "normal" ("24 x 24").  - "wide" ("30 x 26")                  | `"normal" \| "wide"`  | `"normal"`  |


## Events

| Event            | Description                                                       | Type                               |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------- |
| `dsoCardClicked` | Emitted when the Card is clickable and the user clicked the Card. | `CustomEvent<DsoCardClickedEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
