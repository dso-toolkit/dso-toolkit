# `<dso-dropdown-menu>`

Must contain one `button` element with `slot="toggle"`.

Must contain one `.dso-dropdown-options` containing one or more `ul` elements with tabbable elements (`a` or `button`) inside.

Items can be marked as "checked" by adding the attribute `checkable` and adding the `dso-checked` class to `<li>`.

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                                                  | Type                | Default  |
| ----------------------- | ------------------------- | ---------------------------------------------------------------------------- | ------------------- | -------- |
| `checkable`             | `checkable`               | Whether the menu is checkable.                                               | `boolean`           | `false`  |
| `dropdownAlign`         | `dropdown-align`          | Alignment of the dropdown                                                    | `"left" \| "right"` | `"left"` |
| `dropdownOptionsOffset` | `dropdown-options-offset` | Space between button and dropdown options                                    | `number`            | `2`      |
| `open`                  | `open`                    | Whether the menu is open or closed. This attribute is reflected and mutable. | `boolean`           | `false`  |


## Dependencies

### Used by

 - [dso-header](../header)

### Graph
```mermaid
graph TD;
  dso-header --> dso-dropdown-menu
  style dso-dropdown-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
