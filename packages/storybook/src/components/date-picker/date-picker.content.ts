import { html, TemplateResult } from 'lit-html';

export function datePickerWithLabelTemplate(datePicker: TemplateResult, id: string, label: string) {
  return html`
    <label for=${id}>${label}</label>
    ${datePicker}
  `;
}

export function datePickerShowByScriptingTemplate(datePicker: TemplateResult, id: string) {
  return html`
    ${datePicker}

    <button type="button" @click=${() => document.querySelector<any>(`dso-date-picker[identifier="${id}"]`)?.show()}>
      Open
    </button>
  `;
}
