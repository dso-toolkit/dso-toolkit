# dso-list-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                     | Type                            | Default     |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| `checked`  | `checked`  | Whether the List Button is checked                                                              | `boolean`                       | `false`     |
| `count`    | `count`    | When defined the count can show on the list-button.                                             | `number \| undefined`           | `undefined` |
| `disabled` | `disabled` | Whether the List Button is disabled                                                             | `boolean`                       | `false`     |
| `label`    | `label`    | The label of the List Button.                                                                   | `string \| undefined`           | `undefined` |
| `manual`   | `manual`   | Allow user to directly input a value.  Set to `false` to force users to use plus/minus buttons. | `boolean`                       | `true`      |
| `max`      | `max`      | The maximum value.                                                                              | `number \| string \| undefined` | `undefined` |
| `min`      | `min`      | The minimum value.                                                                              | `number \| string \| undefined` | `undefined` |
| `sublabel` | `sublabel` | The sublabel of the List Button.                                                                | `string \| undefined`           | `undefined` |


## Events

| Event               | Description                                                                                                        | Type                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `dsoCountChange`    | Emitted when the user changes the count.                                                                           | `CustomEvent<ListButtonChangeEvent>`   |
| `dsoSelectedChange` | Emitted when the user activates the List Button itself.  Does not fire when the user activates the count controls. | `CustomEvent<ListButtonSelectedEvent>` |


## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-list-button --> dso-icon
  style dso-list-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
