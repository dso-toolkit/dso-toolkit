import { DatePickerChangeEvent, DsoDatePickerCustomEvent } from "@dso-toolkit/core";
import { DatePicker } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreDatePicker: ComponentImplementation<DatePicker> = {
  component: "datePicker",
  implementation: "core",
  template: () =>
    function datePickerTemplate({ id, dsoDateChange, value, min, max, disabled, invalid, autofocus, describedBy }) {
      return html`
        <dso-date-picker
          @dsoDateChange=${(e: DsoDatePickerCustomEvent<DatePickerChangeEvent>) => dsoDateChange?.(e)}
          identifier=${ifDefined(id)}
          value=${ifDefined(value || undefined)}
          min=${ifDefined(min || undefined)}
          max=${ifDefined(max || undefined)}
          dso-autofocus=${ifDefined(autofocus || undefined)}
          ?disabled=${disabled}
          ?invalid=${invalid}
          described-by=${ifDefined(describedBy)}
        ></dso-date-picker>
      `;
    },
};
