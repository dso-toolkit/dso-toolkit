import { DsoDatePickerLegacyChangeEvent } from "@dso-toolkit/core/dist/types/components/date-picker-legacy/date-picker-legacy.interfaces";
import { DatePickerLegacy } from "dso-toolkit";
import * as React from "react";

import { DsoDatePickerLegacy } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactDatePickerLegacy: ComponentImplementation<DatePickerLegacy> = {
  component: "datePickerLegacy",
  implementation: "react",
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
      return (
        <DsoDatePickerLegacy
          onDsoDateChange={(e: CustomEvent<DsoDatePickerLegacyChangeEvent>) => dsoDateChange?.(e)}
          identifier={id}
          direction={direction}
          value={value}
          min={min}
          max={max}
          dsoAutofocus={autofocus}
          disabled={disabled}
          invalid={invalid}
          describedBy={describedBy}
        ></DsoDatePickerLegacy>
      );
    },
};

export function datePickerLegacyWithLabelTemplate(datePickerLegacy: JSX.Element, id: string, label: string) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {datePickerLegacy}
    </>
  );
}

export function datePickerLegacyShowByScriptingTemplate(datePickerLegacy: JSX.Element, id: string) {
  return (
    <>
      {datePickerLegacy}
      <button
        type="button"
        onClick={() =>
          Array.from(document.querySelectorAll("dso-date-picker-legacy"))
            .filter((e) => e.id === id)[0]
            ?.show()
        }
      >
        Open
      </button>
    </>
  );
}
