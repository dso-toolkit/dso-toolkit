import { DsoDatePickerLegacyChangeEvent } from "@dso-toolkit/core/src/components/date-picker-legacy/date-picker-legacy.interfaces";
import { DatePickerLegacy } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreDatePickerLegacy: ComponentImplementation<DatePickerLegacy> = {
  component: "datePickerLegacy",
  implementation: "core",
  template: () =>
    function datePickerLegacyTemplate({
      id,
      dsoDateChange,
      value,
      min,
      max,
      disabled,
      invalid,
      autofocus,
      direction,
      describedBy,
    }) {
      return html`
        <dso-date-picker-legacy
          @dsoDateChange=${(e: CustomEvent<DsoDatePickerLegacyChangeEvent>) => dsoDateChange?.(e)}
          direction=${ifDefined(direction)}
          identifier=${ifDefined(id)}
          value=${ifDefined(value || undefined)}
          min=${ifDefined(min || undefined)}
          max=${ifDefined(max || undefined)}
          dso-autofocus=${ifDefined(autofocus || undefined)}
          ?disabled=${disabled}
          ?invalid=${invalid}
          described-by=${ifDefined(describedBy)}
        ></dso-date-picker-legacy>
      `;
    },
};
