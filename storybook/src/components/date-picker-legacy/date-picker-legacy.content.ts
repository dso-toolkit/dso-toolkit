import { html, TemplateResult } from "lit-html";

export function datePickerLegacyWithLabelTemplate(datePickerLegacy: TemplateResult, id: string, label: string) {
  return html`
    <label for=${id}>${label}</label>
    ${datePickerLegacy}
  `;
}

export function datePickerLegacyShowByScriptingTemplate(datePickerLegacy: TemplateResult, id: string) {
  return html`
    ${datePickerLegacy}

    <button
      type="button"
      @click=${() =>
        Array.from(document.querySelectorAll("dso-date-picker-legacy"))
          .filter((e) => e.id === id)[0]
          ?.show()}
    >
      Open
    </button>
  `;
}
