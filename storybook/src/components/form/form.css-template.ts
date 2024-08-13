import { Form } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssForm: ComponentImplementation<Form<TemplateResult>> = {
  component: "form",
  implementation: "html-css",
  template: ({ formGroupTemplate, formButtonsTemplate }) =>
    function formTemplate({ asteriskExplanation, formTitle, formHeading, mode, formGroups, formButtons }) {
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
          ${formHeading === "h1" // if
            ? html`<h1>${formTitle}</h1>`
            : formHeading === "h2" // else if
              ? html`<h2>${formTitle}</h2>`
              : formHeading === "h3" // else if
                ? html`<h3>${formTitle}</h3>`
                : formHeading === "h4" // else if
                  ? html`<h4>${formTitle}</h4>`
                  : formHeading === "h5" // else if
                    ? html`<h5>${formTitle}</h5>`
                    : formHeading === "h6" // else if
                      ? html`<h6>${formTitle}</h6>`
                      : html`${formTitle}`}
          ${"_$litType$" in formGroups ? formGroups : formGroups.map((formGroup) => formGroupTemplate(formGroup))}
          ${formButtons ? formButtonsTemplate(formButtons) : nothing}
          ${asteriskExplanation === "bottom" || asteriskExplanation === "both"
            ? asteriskExplanationTemplate()
            : nothing}
        </form>
      `;
    },
};
