# dso-accordion



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                        | Type                                                  | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ----------- |
| `allowMultiple` | `allow-multiple` | Allows multiple sections to be open at the same time.                                                                                                              | `boolean`                                             | `false`     |
| `reverseAlign`  | `reverse-align`  | Places the chevron at the opposite side. Note: this mode does not display `state`, `attachmentCount` or `status` props on child `<dso-accordion-section>` elements | `boolean`                                             | `false`     |
| `variant`       | `variant`        |                                                                                                                                                                    | `"compact" \| "conclusion" \| "default" \| undefined` | `'default'` |


## Events

| Event              | Description                                                                                                                                                                                                             | Type                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `dsoToggleSection` | Emitted when a section is toggled.  `event.detail.section` contains the toggled section and its new opened value.\ `event.detail.sections` contains all `<dso-accordion-section>` elements belonging to this accordion. | `CustomEvent<AccordionSectionToggleEvent>` |


## Methods

### `closeOpenSections() => Promise<void>`

Closes all sections belonging to this accordion.

#### Returns

Type: `Promise<void>`



### `getState() => Promise<AccordionInternalState>`



#### Returns

Type: `Promise<AccordionInternalState>`



### `toggleSection(sectionElement: HTMLElement | number) => Promise<void>`

Toggle a section. Pass the `<dso-accordion-section>` element or the index of the section.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
