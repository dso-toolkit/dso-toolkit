import { DsoDatePickerCustomEvent, DatePickerChangeEvent } from "@dso-toolkit/core";
import { DatePicker } from "dso-toolkit";
import * as React from "react";

import { DsoDatePicker } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactDatePicker: ComponentImplementation<DatePicker> = {
  component: "datePicker",
  implementation: "react",
  template: () =>
    function datePickerTemplate({ id, dsoDateChange, value, min, max, disabled, invalid, autofocus, describedBy }) {
      return (
        <DsoDatePicker
          onDsoDateChange={(e: DsoDatePickerCustomEvent<DatePickerChangeEvent>) => dsoDateChange?.(e)}
          identifier={id}
          value={value}
          min={min}
          max={max}
          dsoAutofocus={autofocus}
          disabled={disabled}
          invalid={invalid}
          describedBy={describedBy}
        ></DsoDatePicker>
      );
    },
};
