# `<dso-shopping-cart>`

Zie de voorbeeldpagina's onder Patronen voor hoe de Shopping Cart samenwerkt met `<dso-grid-column>`.

De Shopping Cart rendert zelf geen knop in de header. Plaats zelf een knop in de `button` slot en luister zelf
naar het klik-event. "Alles verwijderen" is bedoeld voor `mode="main"` wanneer er géén Sluiten-knop staat.

```html
<!-- main: sluiten -->
<button slot="button" type="button" class="dso-secondary"><span>Sluiten</span><dso-icon icon="cross"></dso-icon></button>

<!-- main zonder sluiten: alles verwijderen -->
<button slot="button" type="button" class="dso-tertiary"><span>Alles verwijderen</span><dso-icon icon="trash"></dso-icon></button>

<!-- side: openen -->
<dso-icon-button slot="button" icon="chevron-left" variant="secondary" label="Openen"></dso-icon-button>
```

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
