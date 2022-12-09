import { html, TemplateResult } from "lit-html";

export function datePickerWithLabelTemplate(datePicker: TemplateResult, id: string, label: string) {
  return html`
    <label for=${id}>${label}</label>
    ${datePicker}
  `;
}

export function datePickerShowByScriptingTemplate(datePicker: TemplateResult, id: string) {
  return html`
    ${datePicker}

    <button
      type="button"
      @click=${() =>
        Array.from(document.querySelectorAll("dso-date-picker"))
          .filter((e) => e.id === id)[0]
          ?.show()}
    >
      Open
    </button>
  `;
}
