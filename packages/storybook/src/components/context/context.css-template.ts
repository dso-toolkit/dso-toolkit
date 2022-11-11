import { Context } from "@dso-toolkit/sources";

import { html, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";

function contextLabelTemplate(label: TemplateResult, content: TemplateResult, children: TemplateResult) {
  return html`
    <div class="dso-context-wrapper">
      <span class="dso-context-label">${label}</span>
      <div class="dso-context-container">${content}</div>
    </div>
    ${children}
  `;
}

function contextFieldsetTemplate(label: TemplateResult, content: TemplateResult, children: TemplateResult) {
  return html`
    <fieldset>
      <legend class="sr-only">${label}</legend>
      <div class="dso-context-wrapper">
        <span class="dso-context-label" aria-hidden="true">${label}</span>
        <div class="dso-context-container">${content}</div>
      </div>
      ${children}
    </fieldset>
  `;
}

export const cssContext: ComponentImplementation<Context<TemplateResult>> = {
  component: "context",
  implementation: "css",
  template: () =>
    function contextTemplate({ label, type, content, children }) {
      switch (type) {
        case "label":
          return contextLabelTemplate(label, content, children);
        case "legend":
          return contextFieldsetTemplate(label, content, children);
        default:
          throw new TypeError("type can only be label or legend");
      }
    },
};
