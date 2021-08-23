# `<dso-autosuggest>`

Must contain one `input` element of type text. This input must have a label.

```typescript
interface Suggestion {
  value: string;
  type?: string;
}
```

<!-- Auto Generated Below -->


## Properties

| Property                        | Attribute          | Description                                                                                                                                                       | Type                                       | Default     |
| ------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `fetchSuggestions` _(required)_ | --                 | A method that will be called debounced with the input value as its first parameter. This method will also be called when the input is reduced to an empty string. | `(value: string) => Promise<Suggestion[]>` | `undefined` |
| `suggestOnFocus`                | `suggest-on-focus` | Whether the previous suggestions will be presented when the input gets focus again.                                                                               | `boolean`                                  | `false`     |


## Events

| Event      | Description                                                                                                             | Type               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `selected` | Emitted when a suggestion is selected. The `detail` property of the `CustomEvent` will contain the selected suggestion. | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
