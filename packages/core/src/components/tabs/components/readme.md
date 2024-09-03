# `<dso-tab>`



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                | Type                   | Default     |
| ------------ | ------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `active`     | `active`     | Makes the tab active. The tab for which the tabpanel is visible is the active tab.                         | `boolean \| undefined` | `undefined` |
| `disabled`   | `disabled`   | Disables the tab. A disabled tab cannot be activated and it's tabpanel cannot be shown.                    | `boolean \| undefined` | `undefined` |
| `href`       | `href`       | The optional href of the tab. Creates an anchor if present. Creates a button if absent.                    | `string \| undefined`  | `undefined` |
| `identifier` | `identifier` | Adds a unique identifier for the tab. Use this instead of html `id` attribute.  Auto generated if not set. | `string`               | `uuidv4()`  |
| `label`      | `label`      | The text that is shown on the tab.                                                                         | `string \| undefined`  | `undefined` |


## Events

| Event          | Description                                                                             | Type                           |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------ |
| `dsoTabSwitch` | Emitted when the user activates tab via click or arrow keys followed by space or enter. | `CustomEvent<TabsSwitchEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
