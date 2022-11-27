import { DsoDatePickerChangeEvent } from "@dso-toolkit/core/dist/types/components/date-picker/date-picker.interfaces";
import { DatePicker } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoDatePicker } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactDatePicker: ComponentImplementation<DatePicker> = {
  component: "datePicker",
  implementation: "react",
  template: () =>
    function datePickerTemplate({ id, dsoDateChange, value, min, max, disabled, autofocus, direction }) {
      return (
        <DsoDatePicker
          onDsoDateChange={(e: CustomEvent<DsoDatePickerChangeEvent>) => dsoDateChange?.(e)}
          identifier={id}
          direction={direction}
          value={value}
          min={min}
          max={max}
          dsoAutofocus={autofocus}
          disabled={disabled}
        ></DsoDatePicker>
      );
    },
};

export function datePickerWithLabelTemplate(datePicker: JSX.Element, id: string, label: string) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {datePicker}
    </>
  );
}

export function datePickerShowByScriptingTemplate(datePicker: JSX.Element, id: string) {
  return (
    <>
      {datePicker}
      <button
        type="button"
        onClick={() =>
          Array.from(document.querySelectorAll("dso-date-picker"))
            .filter((e) => e.id === id)[0]
            ?.show()
        }
      >
        Open
      </button>
    </>
  );
}
