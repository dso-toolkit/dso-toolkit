import { DsoDatePickerChangeEvent } from '@dso-toolkit/core/dist/types/components/date-picker/date-picker';
import { DatePicker } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoDatePicker } from '../..';

export function datePickerTemplate({ id, onDateChange, value, min, max, disabled, autofocus }: DatePicker) {
  return (
    <DsoDatePicker
      dateChange={(e: CustomEvent<DsoDatePickerChangeEvent>) => onDateChange(e)}
      identifier={id}
      value={value}
      min={min}
      max={max}
      dsoAutofocus={autofocus}
      disabled={disabled}
    ></DsoDatePicker>
  );
}

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
      <button type="button" onClick={() => document.querySelector<HTMLDsoDatePickerElement>(`DsoDatePicker[identifier="${id}"]`)?.show()}>
        Open
      </button>
    </>
  );
}
