# `<dso-accordion>`

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                        | Type                                                               | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ----------- |
| `reverseAlign` | `reverse-align` | Places the chevron at the opposite side. Note: this mode does not display `state`, `attachmentCount` or `status` props on child `<dso-accordion-section>` elements | `boolean`                                                          | `false`     |
| `variant`      | `variant`       | The variant of the Accordion.                                                                                                                                      | `"compact" \| "conclusion" \| "default" \| "neutral" \| undefined` | `"default"` |


## Events

| Event                          | Description                                                                                                                                                                                                                                                                                                                                   | Type                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `dsoToggleSection`             | Emitted when a section is toggled.  `event.detail.originalEvent` contains the original `MouseEvent` when the section is toggled by clicking on the header `event.detail.section` contains the toggled section and its new opened value.\ `event.detail.sections` contains all `<dso-accordion-section>` elements belonging to this accordion. | `CustomEvent<AccordionSectionToggleEvent>`             |
| `dsoToggleSectionAnimationEnd` | Event emitted when the accordion section completes its toggle animation.                                                                                                                                                                                                                                                                      | `CustomEvent<AccordionSectionToggleAnimationEndEvent>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
