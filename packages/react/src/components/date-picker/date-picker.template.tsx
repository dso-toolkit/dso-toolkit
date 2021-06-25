import { DatePicker } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoDatePicker } from '../..';

export function datePickerTemplate({ id, onDateChange, value, min, max, disabled }: DatePicker) {
  return (
    <DsoDatePicker
      dateChange={(e: CustomEvent<DsoDatePickerChangeEvent>) => onDateChange(e)}
      identifier={id}
      value={value}
      min={min}
      max={max}
      disabled={disabled}
    ></DsoDatePicker>
  );
}

export function datePickerWithLabelTemplate(datePicker: TemplateResult, id: string, label: string) {
  return (
    <>
      <label for={id}>{label}</label>
      {datePicker}
    </>
  );
}

export function datePickerShowByScriptingTemplate(datePicker: TemplateResult, id: string) {
  return (
    <>
      {datePicker}
      <button type="button" onClick={() => document.querySelector<HTMLDsoDatePickerElement>(`DsoDatePicker[identifier="${id}"]`)?.show()}>
        Open
      </button>
    </>
  );
}
