import { DatePicker } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { DsoDatePickerChangeEvent } from './date-picker';

export function datePickerTemplate({ id, onDateChange, value, min, max, disabled, autofocus, direction }: DatePicker) {
  return html`
    <dso-date-picker
      @dsoDateChange=${(e: CustomEvent<DsoDatePickerChangeEvent>) => onDateChange?.(e)}
      direction=${ifDefined(direction)}
      identifier=${ifDefined(id)}
      value=${ifDefined(value || undefined)}
      min=${ifDefined(min || undefined)}
      max=${ifDefined(max || undefined)}
      dso-autofocus=${ifDefined(autofocus || undefined)}
      ?disabled=${disabled}
    ></dso-date-picker>
  `;
}

