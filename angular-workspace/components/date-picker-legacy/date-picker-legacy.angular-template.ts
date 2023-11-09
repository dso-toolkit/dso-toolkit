import { DatePickerLegacy } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const angularDatePickerLegacy: ComponentImplementation<DatePickerLegacy> = {
  component: "datePickerLegacy",
  implementation: "angular",
  template: () =>
    function datePickerLegacyTemplate(props) {
      return {
        props,
        template: `
          <dso-date-picker-legacy
            [identifier]="id"
            [direction]="direction"
            [value]="value"
            [min]="min"
            [max]="max"
            [dsoAutofocus]="autofocus"
            [disabled]="disabled"
            [invalid]="invalid"
            [describedBy]="describedBy"
            (dsoDateChange)="dsoDateChange?.($event)"
          ></dso-date-picker-legacy>`,
      };
    },
};
