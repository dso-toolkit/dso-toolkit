# `<dso-accordion-section>`

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                           | Type                                                                   | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| `attachmentCount` | `attachment-count` | `attachmentCount` takes precedence over `icon`                                        | `number \| undefined`                                                  | `undefined` |
| `handleTitle`     | `handle-title`     |                                                                                       | `string \| undefined`                                                  | `undefined` |
| `handleUrl`       | `handle-url`       | When set the handle will render as a `<a>`. When undefined it renders as a `<button>` | `string \| undefined`                                                  | `undefined` |
| `heading`         | `heading`          |                                                                                       | `"h2" \| "h3" \| "h4" \| "h5"`                                         | `"h2"`      |
| `icon`            | `icon`             |                                                                                       | `string \| undefined`                                                  | `undefined` |
| `open`            | `open`             |                                                                                       | `boolean`                                                              | `false`     |
| `state`           | `state`            | `state` takes precedence over `attachmentCount` and `icon`                            | `"danger" \| "error" \| "info" \| "success" \| "warning" \| undefined` | `undefined` |
| `status`          | `status`           |                                                                                       | `string \| undefined`                                                  | `undefined` |


## Methods

### `scrollSectionIntoView() => Promise<void>`

Scroll this section into view when needed.

#### Returns

Type: `Promise<void>`



### `toggleSection(scrollIntoView?: boolean) => Promise<void>`

Toggle this section.

#### Returns

Type: `Promise<void>`




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
