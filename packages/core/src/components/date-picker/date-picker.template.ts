import { DatePicker } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { DsoDatePickerChangeEvent } from './date-picker';

export function datePickerTemplate({ id, onDateChange, value, min, max, disabled }: DatePicker) {
  return html`
    <dso-date-picker
      @dateChange=${(e: CustomEvent<DsoDatePickerChangeEvent>) => onDateChange(e)}
      identifier=${id}
      value=${ifDefined(value || undefined)}
      min=${ifDefined(min || undefined)}
      max=${ifDefined(max || undefined)}
      ?disabled=${disabled}
    ></dso-date-picker>
  `;
}
