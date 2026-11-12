# `<dso-shopping-cart>`

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                    | Type               | Default  |
| -------- | --------- | ------------------------------ | ------------------ | -------- |
| `mode`   | `mode`    | The mode of the Shopping Cart. | `"main" \| "side"` | `"side"` |


## Slots

| Slot        | Description                                                                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|             | The slot to place the `dso-shopping-cart-item` elements in.                                                                                                                                             |
| `"button"`  | An optional slot to place a button in the header of the Shopping Cart, e.g. a "Sluiten" button (main), an "Openen" Icon Button (side) or a tertiary "Alles verwijderen" button.                         |
| `"heading"` | The title of the Shopping Cart, as a heading element (e.g. `<h3 slot="heading">`) matching the heading hierarchy of the page.                                                                           |
| `"warning"` | An optional explanation of the warning icon of the Shopping Cart Items, e.g. a `<p>` starting with "Let op:". Shown below the items on a white background spanning the full width of the Shopping Cart. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
