# `<dso-logo>`

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                                                                                                                                                                                                                                                                                                                                         | Type                  | Default              |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------- |
| `label`    | `label`     | The label clarifies the service within the Omgevingsloket, shown as a subtitle (and on smaller screens as the main wordmark itself).                                                                                                                                                                                                                                                | `string \| undefined` | `undefined`          |
| `labelUrl` | `label-url` | The url the label is pointing to.                                                                                                                                                                                                                                                                                                                                                   | `string \| undefined` | `undefined`          |
| `logoUrl`  | `logo-url`  | The url the logo is pointing to.                                                                                                                                                                                                                                                                                                                                                    | `string \| undefined` | `undefined`          |
| `name`     | `name`      | An alternative name for the logo wordmark Omgevingsloket. For instance `Environment\| Desk`. It should contains a pipe-character: the left-hand side of the pipe will be shown in grasgroen, the right-hand side of the pipe will be shown in bosgroen. When omitted the logo wordmark will default to Omgevingsloket, with 'Omgevings' shown in grasgroen and 'loket' in bosgroen. | `string`              | `"Omgevings\|loket"` |
| `ribbon`   | `ribbon`    | The ribbon contains the text for a possible 'sticker' on top of the logo. Used to clarify the (non-production) server environment ("int", "kta", "pfm", "pre", or "dmo")                                                                                                                                                                                                            | `string \| undefined` | `undefined`          |


## Events

| Event           | Description                                                                | Type                               |
| --------------- | -------------------------------------------------------------------------- | ---------------------------------- |
| `dsoLabelClick` | Emitted when the label in the logo is clicked (only when labelUrl is set). | `CustomEvent<LogoLabelClickEvent>` |
| `dsoLogoClick`  | Emitted when the logo is clicked (only when logoUrl is set).               | `CustomEvent<LogoClickEvent>`      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
