# `<dso-list-button>`

<!-- Auto Generated dso-toolkit -->

## Types

### ListButtonChangeEvent

```typescript
export interface ListButtonChangeEvent {
  originalEvent?: Event;
  /** The value that was set */
  count: number;
}
```

<!-- src/components/list-button/list-button.interfaces.ts::ListButtonChangeEvent -->

### ListButtonSelectedEvent

```typescript
export interface ListButtonSelectedEvent {
  originalEvent?: Event;
  /** The value that was set */
  checked: boolean;
}
```

<!-- src/components/list-button/list-button.interfaces.ts::ListButtonSelectedEvent -->

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute           | Description                                            | Type                            | Default     |
| ------------------ | ------------------- | ------------------------------------------------------ | ------------------------------- | ----------- |
| `checked`          | `checked`           | Whether the List Button is checked.                    | `boolean`                       | `false`     |
| `count`            | `count`             | When defined the count can show on the List Button.    | `number \| undefined`           | `undefined` |
| `disabled`         | `disabled`          | Whether the List Button is disabled.                   | `boolean`                       | `false`     |
| `label`            | `label`             | The label of the List Button.                          | `string \| undefined`           | `undefined` |
| `max`              | `max`               | The maximum value.                                     | `number \| string \| undefined` | `undefined` |
| `min`              | `min`               | The minimum value.                                     | `number \| string \| undefined` | `undefined` |
| `subcontentPrefix` | `subcontent-prefix` | Prefix to subcontent for the purpose of screenreading. | `string \| undefined`           | `undefined` |
| `sublabel`         | `sublabel`          | The sublabel of the List Button.                       | `string \| undefined`           | `undefined` |

## Events

| Event               | Description                                                                                                       | Type                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `dsoCountChange`    | Emitted when the user changes the count.                                                                          | `CustomEvent<ListButtonChangeEvent>`   |
| `dsoSelectedChange` | Emitted when the user activates the List Button itself. Does not fire when the user activates the count controls. | `CustomEvent<ListButtonSelectedEvent>` |

## Dependencies

### Depends on

- [dso-selectable](../selectable)
- [dso-icon](../icon)

### Graph

```mermaid
graph TD;
  dso-list-button --> dso-selectable
  dso-list-button --> dso-icon
  dso-selectable --> dso-info-button
  dso-selectable --> dso-info
  dso-info-button --> dso-icon
  dso-info --> dso-icon
  style dso-list-button fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
