import { DatePicker } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const angularDatePicker: ComponentImplementation<DatePicker> = {
  component: "datePicker",
  implementation: "angular",
  template: () =>
    function datePickerTemplate(props) {
      return {
        props,
        template: `
          <dso-date-picker
            [identifier]="id"
            [direction]="direction"
            [value]="value"
            [min]="min"
            [max]="max"
            [dsoAutofocus]="autofocus"
            [disabled]="disabled"
            (dsoDateChange)="dsoDateChange?.($event)"
          ></dso-date-picker>`,
      };
    },
};
