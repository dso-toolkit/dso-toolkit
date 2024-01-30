import { Form } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssForm: ComponentImplementation<Form<TemplateResult>> = {
  component: "form",
  implementation: "html-css",
  template: ({ formGroupTemplate, formButtonsTemplate }) =>
    function formTemplate({ legend, legendHeading, mode, formGroups, formButtons }) {
      return html`
        <form class=${ifDefined(mode === "horizontal" ? "form-horizontal" : undefined)}>
          <!-- form explanation WIP -->
          <div class="form-explanation" aria-hidden="true">
            <p class="form-explanation-text">
              Velden met een <span class="form-explanation-required"></span> zijn verplicht.
            </p>
          </div>
          <!-- /form explanation WIP -->
          <fieldset>
            <legend>
              ${legendHeading === "h1" // if
                ? html`<h1>${legend}</h1>`
                : legendHeading === "h2" // else if
                  ? html`<h2>${legend}</h2>`
                  : legendHeading === "h3" // else if
                    ? html`<h3>${legend}</h3>`
                    : legendHeading === "h4" // else if
                      ? html`<h4>${legend}</h4>`
                      : legendHeading === "h5" // else if
                        ? html`<h5>${legend}</h5>`
                        : legendHeading === "h6" // else if
                          ? html`<h6>${legend}</h6>`
                          : html`${legend}`}
            </legend>
            ${"_$litType$" in formGroups ? formGroups : formGroups.map((formGroup) => formGroupTemplate(formGroup))}
            ${formButtons ? formButtonsTemplate(formButtons) : nothing}
          </fieldset>
          <!-- form explanation WIP -->
          <div class="form-explanation" aria-hidden="true">
            <p class="form-explanation-text">
              Velden met een <span class="form-explanation-required"></span> zijn verplicht.
            </p>
          </div>
          <!-- /form explanation WIP -->
        </form>
      `;
    },
};
