import {
  DatePickerBlurEvent,
  DatePickerChangeEvent,
  DatePickerFocusEvent,
  DatePickerKeyboardEvent,
  DsoDatePickerCustomEvent,
} from "@dso-toolkit/core";
import { DatePicker } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreDatePicker: ComponentImplementation<DatePicker> = {
  component: "datePicker",
  implementation: "core",
  template: () =>
    function datePickerTemplate({
      id,
      dsoDateChange,
      dsoBlur,
      dsoFocus,
      dsoKeyDown,
      dsoKeyUp,
      value,
      min,
      max,
      disabled,
      invalid,
      autofocus,
      describedBy,
      required,
    }) {
      return html`
        <dso-date-picker
          @dsoDateChange=${(e: DsoDatePickerCustomEvent<DatePickerChangeEvent>) => dsoDateChange?.(e)}
          @dsoBlur=${(e: DsoDatePickerCustomEvent<DatePickerBlurEvent>) => dsoBlur?.(e)}
          @dsoFocus=${(e: DsoDatePickerCustomEvent<DatePickerFocusEvent>) => dsoFocus?.(e)}
          @dsoKeyDown=${(e: DsoDatePickerCustomEvent<DatePickerKeyboardEvent>) => dsoKeyDown?.(e)}
          @dsoKeyUp=${(e: DsoDatePickerCustomEvent<DatePickerKeyboardEvent>) => dsoKeyUp?.(e)}
          identifier=${ifDefined(id)}
          value=${ifDefined(value || undefined)}
          min=${ifDefined(min || undefined)}
          max=${ifDefined(max || undefined)}
          dso-autofocus=${ifDefined(autofocus || undefined)}
          ?disabled=${disabled}
          ?invalid=${invalid}
          ?required=${required}
          described-by=${ifDefined(describedBy)}
        ></dso-date-picker>
      `;
    },
};
