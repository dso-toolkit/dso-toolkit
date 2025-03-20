import { Form, FormGroupCollection, FormGroupCollectionHeadingLevel } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";
import { classMap } from "lit-html/directives/class-map.js";

export const cssForm: ComponentImplementation<Form<TemplateResult>> = {
  component: "form",
  implementation: "html-css",
  template: ({ formGroupTemplate, formButtonsTemplate }) =>
    function formTemplate({ asteriskExplanation, mode, formModifier, content, formButtons }) {
      function asteriskExplanationTemplate() {
        return html`<div class="form-explanation" aria-hidden="true">
          <p class="form-explanation-text">
            Velden met een <span class="form-explanation-required"></span> zijn verplicht.
          </p>
        </div>`;
      }

      function heading(title: string, level?: FormGroupCollectionHeadingLevel) {
        if (level === "h1") {
          return html`<h1>${title}</h1>`;
        }

        if (level === "h2") {
          return html`<h2>${title}</h2>`;
        }

        if (level === "h3") {
          return html`<h3>${title}</h3>`;
        }

        if (level === "h4") {
          return html`<h4>${title}</h4>`;
        }

        if (level === "h5") {
          return html`<h5>${title}</h5>`;
        }

        if (level === "h6") {
          return html`<h6>${title}</h6>`;
        }

        return html`${title}`;
      }

      function formGroupCollection({ title, headingLevel, formGroups }: FormGroupCollection<TemplateResult>) {
        return html`<fieldset class="dso-form-group-collection">
          <legend>${heading(title, headingLevel)}</legend>
          ${formGroups.map((formGroup) => formGroupTemplate(formGroup))}
        </fieldset>`;
      }

      return html`
        <form
          class=${classMap({
            "form-horizontal": mode === "horizontal",
            [formModifier || ""]: !!formModifier,
          })}
        >
          ${asteriskExplanation === "top" || asteriskExplanation === "both" ? asteriskExplanationTemplate() : nothing}
          ${content.map((formGroup) =>
            "title" in formGroup ? formGroupCollection(formGroup) : formGroupTemplate(formGroup),
          )}
          ${formButtons ? formButtonsTemplate(formButtons) : nothing}
          ${asteriskExplanation === "bottom" || asteriskExplanation === "both"
            ? asteriskExplanationTemplate()
            : nothing}
        </form>
      `;
    },
};
