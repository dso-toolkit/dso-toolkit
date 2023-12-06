import { Context } from "dso-toolkit";

import { html, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";
import { classMap } from "lit-html/directives/class-map.js";

function contextLabelTemplate({ label, content, children, alignLeft }: Context<TemplateResult>) {
  return html`
    <div
      class="dso-context-wrapper ${classMap({
        "dso-align-left": !!alignLeft,
      })}"
    >
      <span class="dso-context-label">${label}</span>
      <div class="dso-context-container">${content}</div>
    </div>
    ${children}
  `;
}

function contextFieldsetTemplate({ label, content, children, alignLeft }: Context<TemplateResult>) {
  return html`
    <fieldset>
      <legend class="sr-only">${label}</legend>
      <div
        class="dso-context-wrapper ${classMap({
          "dso-align-left": !!alignLeft,
        })}"
      >
        <span class="dso-context-label" aria-hidden="true">${label}</span>
        <div class="dso-context-container">${content}</div>
      </div>
      ${children}
    </fieldset>
  `;
}

export const cssContext: ComponentImplementation<Context<TemplateResult>> = {
  component: "context",
  implementation: "html-css",
  template: () =>
    function contextTemplate(context) {
      switch (context.type) {
        case "label":
          return contextLabelTemplate(context);
        case "legend":
          return contextFieldsetTemplate(context);
        default:
          throw new TypeError("type can only be label or legend");
      }
    },
};
