import { DatePicker } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { DsoDatePickerChangeEvent } from './date-picker';

export function datePickerTemplate({ id, onDateChange, value, min, max, disabled }: DatePicker) {
  return html`
    <dso-date-picker
      @dateChange=${(e: CustomEvent<DsoDatePickerChangeEvent>) => onDateChange(e)}
      identifier=${ifDefined(id)}
      value=${ifDefined(value || undefined)}
      min=${ifDefined(min || undefined)}
      max=${ifDefined(max || undefined)}
      ?disabled=${disabled}
    ></dso-date-picker>
  `;
}

export function datePickerWithLabelTemplate(datePicker: TemplateResult, id: string, label: string) {
  return html`
    <label for=${id}>${label}</label>
    ${datePicker}
  `;
}

export function datePickerShowByScriptingTemplate(datePicker: TemplateResult, id: string) {
  return html`
    ${datePicker}

    <button type="button" @click=${() => document.querySelector<HTMLDsoDatePickerElement>(`dso-date-picker[identifier="${id}"]`)?.show()}>
      Open
    </button>
  `;
}