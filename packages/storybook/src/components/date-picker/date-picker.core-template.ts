import { DatePicker } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

import { DsoDatePickerChangeEvent } from "@dso-toolkit/core/src/components/date-picker/date-picker.interfaces";

export const coreDatePicker: ComponentImplementation<DatePicker> = {
  component: "datePicker",
  implementation: "core",
  template: () =>
    function datePickerTemplate({ id, dsoDateChange, value, min, max, disabled, autofocus, direction }) {
      return html`
        <dso-date-picker
          @dsoDateChange=${(e: CustomEvent<DsoDatePickerChangeEvent>) => dsoDateChange?.(e)}
          direction=${ifDefined(direction)}
          identifier=${ifDefined(id)}
          value=${ifDefined(value || undefined)}
          min=${ifDefined(min || undefined)}
          max=${ifDefined(max || undefined)}
          dso-autofocus=${ifDefined(autofocus || undefined)}
          ?disabled=${disabled}
        ></dso-date-picker>
      `;
    },
};
