# `<dso-legend-group>`

Groepeert `dso-legend-item` elementen onder een gezamenlijke heading. Het component biedt een optionele edit/view modus die automatisch wordt doorgegeven aan alle onderliggende `dso-legend-item` elementen.

Wanneer `mode` is ingesteld op `"view"` wordt een potlood-icoon getoond. In `"edit"` modus wordt een vinkje-icoon getoond en krijgen de onderliggende items automatisch `mode="edit"`. Zonder `mode` wordt geen icoon getoond.

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                              | Type                            | Default     |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| `mode`   | `mode`    | Controls whether this Legend Group and its child Legend Items are in edit or view mode. When not set, no edit/view toggle icon is shown. | `"edit" \| "view" \| undefined` | `undefined` |


## Events

| Event                      | Description | Type                                      |
| -------------------------- | ----------- | ----------------------------------------- |
| `dsoLegendGroupModeChange` |             | `CustomEvent<LegendGroupModeChangeEvent>` |


## Slots

| Slot        | Description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
|             | The legend items for this group. Should contain `dso-legend-item` elements.                    |
| `"heading"` | The heading/label for this Legend Group. Should be targeted with `<h3 slot="heading">...</h3>` |


## Dependencies

### Depends on

- [dso-icon-button](../../icon-button)

### Graph
```mermaid
graph TD;
  dso-legend-group --> dso-icon-button
  dso-icon-button --> dso-icon
  style dso-legend-group fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
