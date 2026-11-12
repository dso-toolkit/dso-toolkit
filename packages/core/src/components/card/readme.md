# `<dso-card>`

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description                                                                       | Type                   | Default     |
| ------------------- | --------- | --------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `active`            | `active`  | Makes the Card active.                                                            | `boolean \| undefined` | `undefined` |
| `href` _(required)_ | `href`    | The URL to which the Card heading links.                                          | `string \| undefined`  | `undefined` |
| `mode`              | `mode`    | Display the link as an external link or a download link  - "download"  - "extern" | `string \| undefined`  | `undefined` |


## Events

| Event          | Description                               | Type                          |
| -------------- | ----------------------------------------- | ----------------------------- |
| `dsoCardClick` | Emitted when the Card heading is clicked. | `CustomEvent<CardClickEvent>` |


## Slots

| Slot             | Description                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `"content"`      | An optional slot to place `Rich Content` in.                                                          |
| `"heading"`      | A  slot to place the title of the card in.                                                            |
| `"interactions"` | An optional slot for one or more `Button`s, `Icon Button`s, `Label`s, `Toggletip`s or `SlideToggle`s. |
| `"selectable"`   | An optional slot to place a `Selectable` in.                                                          |


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
