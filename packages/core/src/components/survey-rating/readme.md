# `<dso-survey-rating>`



<!-- Auto Generated Below -->


## Events

| Event       | Description                                             | Type                                   |
| ----------- | ------------------------------------------------------- | -------------------------------------- |
| `dsoClose`  | Emitted when the user wants to close the  Survey Ratin. | `CustomEvent<SurveyRatingCloseEvent>`  |
| `dsoSubmit` | Emitted when user submits the Survey Rating.            | `CustomEvent<SurveyRatingSubmitEvent>` |


## Dependencies

### Depends on

- [dso-panel](../panel)

### Graph
```mermaid
graph TD;
  dso-survey-rating --> dso-panel
  dso-panel --> dso-icon
  style dso-survey-rating fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
