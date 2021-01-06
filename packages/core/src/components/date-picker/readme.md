# dso-date-picker



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute           | Description                                                                                                                                                                                                                    | Type                                                                                                                                                                                                                                                                                                            | Default               |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `direction`      | `direction`         | Forces the opening direction of the calendar modal to be always left or right. This setting can be useful when the input is smaller than the opening date picker would be as by default the picker always opens towards right. | `"left" \| "right"`                                                                                                                                                                                                                                                                                             | `"right"`             |
| `firstDayOfWeek` | `first-day-of-week` | Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc. Default is Monday.                                                                                                                         | `DaysOfWeek.Friday \| DaysOfWeek.Monday \| DaysOfWeek.Saturday \| DaysOfWeek.Sunday \| DaysOfWeek.Thursday \| DaysOfWeek.Tuesday \| DaysOfWeek.Wednesday`                                                                                                                                                       | `DaysOfWeek.Monday`   |
| `localization`   | --                  | Button labels, day names, month names, etc, used for localization. Default is English.                                                                                                                                         | `{ buttonLabel: string; selectedDateMessage: string; prevMonthLabel: string; nextMonthLabel: string; monthSelectLabel: string; yearSelectLabel: string; closeLabel: string; keyboardInstruction: string; calendarHeading: string; dayNames: DayNames; monthNames: MonthsNames; monthNamesShort: MonthsNames; }` | `defaultLocalization` |
| `max`            | `max`               | Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD. This setting can be used alone or together with the min property.                                                                                   | `string`                                                                                                                                                                                                                                                                                                        | `""`                  |
| `min`            | `min`               | Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD. This setting can be used alone or together with the max property.                                                                                   | `string`                                                                                                                                                                                                                                                                                                        | `""`                  |


## Events

| Event       | Description                            | Type                                                                                            |
| ----------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `dsoChange` | Event emitted when a date is selected. | `CustomEvent<{ component: "dso-date-picker"; valueAsDate: Date \| undefined; value: string; }>` |


## Methods

### `hide(moveFocusToButton?: boolean) => Promise<void>`

Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
returning to the date picker's button. Default is true.

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the calendar modal, moving focus to the calendar inside.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-date-picker --> dso-icon
  style dso-date-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
