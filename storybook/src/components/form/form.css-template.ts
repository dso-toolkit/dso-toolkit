import { Form } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssForm: ComponentImplementation<Form<TemplateResult>> = {
  component: "form",
  implementation: "html-css",
  template: ({ formGroupTemplate, formButtonsTemplate }) =>
    function formTemplate({ asteriskExplanation, mode, formGroups, formButtons }) {
      function asteriskExplanationTemplate() {
        return html`<div class="form-explanation" aria-hidden="true">
          <p class="form-explanation-text">
            Velden met een <span class="form-explanation-required"></span> zijn verplicht.
          </p>
        </div>`;
      }

      return html`
        <form class=${ifDefined(mode === "horizontal" ? "form-horizontal" : undefined)}>
          ${asteriskExplanation === "top" || asteriskExplanation === "both" ? asteriskExplanationTemplate() : nothing}
          ${"_$litType$" in formGroups ? formGroups : formGroups.map((formGroup) => formGroupTemplate(formGroup))}
          ${formButtons ? formButtonsTemplate(formButtons) : nothing}
          ${asteriskExplanation === "bottom" || asteriskExplanation === "both"
            ? asteriskExplanationTemplate()
            : nothing}
        </form>
      `;
    },
};
