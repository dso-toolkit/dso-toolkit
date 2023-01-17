# dso-modal

Bij het instantieren van een `dso-modal` wordt op de body `.dso-modal-open` gezet. Deze class zorgt ervoor dat het scrollgedrag 'achter' de modal wordt uitgezet. Als afnemer kun je dus een modal starten door `<dso-modal>` pas te renderen als je een modal wil.

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                          | Type                                   | Default     |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------ | -------------------------------------- | ----------- |
| `initialFocus`    | `initial-focus`     | selector for the element to be focused initially                                     | `string \| undefined`                  | `undefined` |
| `modalTitle`      | `modal-title`       |                                                                                      | `string \| undefined`                  | `undefined` |
| `role`            | `role`              | the role for the modal `dialog` \| `alert` \| `alertdialog` defaults to `dialog`     | `"alert" \| "alertdialog" \| "dialog"` | `"dialog"`  |
| `showCloseButton` | `show-close-button` | when `false` the close button in the header will not be rendered. Defaults to `true` | `boolean`                              | `true`      |


## Events

| Event      | Description | Type                              |
| ---------- | ----------- | --------------------------------- |
| `dsoClose` |             | `CustomEvent<DsoModalCloseEvent>` |


## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-modal --> dso-icon
  style dso-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
