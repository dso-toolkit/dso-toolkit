# `<dso-progress-bar>`



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute | Description                                                       | Type                       | Default     |
| ------------------------- | --------- | ----------------------------------------------------------------- | -------------------------- | ----------- |
| `count` _(required)_      | `count`   | Total pages                                                       | `number`                   | `undefined` |
| `createLink` _(required)_ | --        | Function is called to construct the href for each anchor element. | `(page: number) => string` | `undefined` |
| `current` _(required)_    | `current` | Current page                                                      | `number`                   | `undefined` |
| `label` _(required)_      | `label`   | Current page                                                      | `string`                   | `undefined` |


## Events

| Event        | Description            | Type                                     |
| ------------ | ---------------------- | ---------------------------------------- |
| `selectPage` | Emitted on page select | `CustomEvent<PaginationSelectPageEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
