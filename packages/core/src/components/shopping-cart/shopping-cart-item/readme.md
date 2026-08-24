# `<dso-shopping-cart-item>`

 
<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                         | Type                  | Default     |
| ----------- | ----------- | ------------------------------------------------------------------- | --------------------- | ----------- |
| `editable`  | `editable`  | When set an edit (pencil) action is rendered.                       | `boolean`             | `false`     |
| `label`     | `label`     | The name of the item. In the `edit` mode this is used as the title. | `string \| undefined` | `undefined` |
| `mode`      | `mode`      | The mode of the Shopping Cart Item.                                 | `"edit" \| "view"`    | `"view"`    |
| `removable` | `removable` | When set a delete (trash) action is rendered.                       | `boolean`             | `false`     |
| `warning`   | `warning`   | When set a warning icon is rendered before the name.                | `boolean`             | `false`     |


## Events

| Event       | Description                                                       | Type                                       |
| ----------- | ----------------------------------------------------------------- | ------------------------------------------ |
| `dsoClose`  | Emitted when the user clicks the close button in the `edit` mode. | `CustomEvent<ShoppingCartItemCloseEvent>`  |
| `dsoDelete` | Emitted when the user clicks the delete (trash) action.           | `CustomEvent<ShoppingCartItemDeleteEvent>` |
| `dsoEdit`   | Emitted when the user clicks the edit (pencil) action.            | `CustomEvent<ShoppingCartItemEditEvent>`   |


## Slots

| Slot     | Description                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
|          | In the `edit` mode it holds the form content. In the `view` mode it can hold nested Shopping Cart Items, which render as sub items. |
| `"info"` | An optional line of information shown below the name.                                                                               |


## Dependencies

### Depends on

- [dso-icon](../../icon)
- [dso-icon-button](../../icon-button)

### Graph
```mermaid
graph TD;
  dso-shopping-cart-item --> dso-icon
  dso-shopping-cart-item --> dso-icon-button
  dso-icon-button --> dso-icon
  style dso-shopping-cart-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
