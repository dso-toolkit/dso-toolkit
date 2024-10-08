# dso-card

Beware: clicking the heading link with property `href` set doesn't navigate to the URL set. This is caused 
by the storybook implementation, which inhibits this normal behavior. Use developer tools to remove the Event 
Listener `dsoCardClicked` to enable the navigation to the set `href`
![img.png](../../../../dso-toolkit/storybook-assets/images/remove-dso-card-clicked.png)

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                                                                                                                                                                                       | Type                  | Default     |
| ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `clickable`  | `clickable`   | <span style="color:red">**[DEPRECATED]**</span> Use `href` instead and `<ELEMENT_TYPE slot="heading">` should NOT be of element type `a` (anchor).<br/><br/>Whether or not the Card is clickable. This is NOT a boolean attribute. Set to "false" to make the Card non-clickable. | `boolean`             | `true`      |
| `href`       | `href`        | The URL to which the Card heading links.                                                                                                                                                                                                                                          | `string \| undefined` | `undefined` |
| `imageShape` | `image-shape` | Presentation of image in header.  - "normal" ("24 x 24").  - "wide" ("30 x 26")                                                                                                                                                                                                   | `"normal" \| "wide"`  | `"normal"`  |
| `mode`       | `mode`        | Display the link as an external link or a download link  - "download"  - "extern"                                                                                                                                                                                                 | `string \| undefined` | `undefined` |


## Events

| Event            | Description                                                       | Type                               |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------- |
| `dsoCardClicked` | Emitted when the Card is clickable and the user clicked the Card. | `CustomEvent<DsoCardClickedEvent>` |


## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-card --> dso-icon
  style dso-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
