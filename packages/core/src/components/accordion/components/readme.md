# `<dso-accordion-section>`

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                           | Type                                                                   | Default     |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| `attachmentCount`   | `attachment-count`   | `attachmentCount` takes precedence over `icon`                                        | `number \| undefined`                                                  | `undefined` |
| `handleTitle`       | `handle-title`       | The title of the handle                                                               | `string \| undefined`                                                  | `undefined` |
| `handleUrl`         | `handle-url`         | When set the handle will render as a `<a>`. When undefined it renders as a `<button>` | `string \| undefined`                                                  | `undefined` |
| `heading`           | `heading`            | Which heading element to use.                                                         | `"h2" \| "h3" \| "h4" \| "h5"`                                         | `"h2"`      |
| `icon`              | `icon`               | To set an icon in the heading handle.                                                 | `string \| undefined`                                                  | `undefined` |
| `open`              | `open`               | Set the Accordion Section open.                                                       | `boolean`                                                              | `false`     |
| `status`            | `status`             | `state` takes precedence over `attachmentCount` and `icon`                            | `"danger" \| "error" \| "info" \| "success" \| "warning" \| undefined` | `undefined` |
| `statusDescription` | `status-description` | The status of the section.                                                            | `string \| undefined`                                                  | `undefined` |


## Events

| Event             | Description                                                              | Type                                             |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
| `dsoAnimationEnd` | Event emitted when the Accordion Section completes its toggle animation. | `CustomEvent<AccordionSectionAnimationEndEvent>` |
| `dsoToggleClick`  | Emitted when the user activates the toggle button.                       | `CustomEvent<AccordionSectionToggleClickEvent>`  |


## Dependencies

### Depends on

- [dso-icon](../../icon)
- [dso-expandable](../../expandable)

### Graph
```mermaid
graph TD;
  dso-accordion-section --> dso-icon
  dso-accordion-section --> dso-expandable
  style dso-accordion-section fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
