import { TemplateResult, html } from "lit-html";

export function datePickerWithLabelTemplate(datePicker: TemplateResult, id: string, label: string) {
  return html`
    <label for=${id}>${label}</label>
    ${datePicker}
  `;
}
