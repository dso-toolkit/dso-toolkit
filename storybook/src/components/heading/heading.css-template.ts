import { Heading } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssHeading: ComponentImplementation<Heading<TemplateResult>> = {
  component: "heading",
  implementation: "html-css",
  template: () =>
    function headingTemplate({ level, children, slotName }) {
      if (level === 1) {
        return html`<h1 slot=${ifDefined(slotName)}>${children}</h1>`;
      }

      if (level === 2) {
        return html`<h2 slot=${ifDefined(slotName)}>${children}</h2>`;
      }

      if (level === 3) {
        return html`<h3 slot=${ifDefined(slotName)}>${children}</h3>`;
      }

      if (level === 4) {
        return html`<h4 slot=${ifDefined(slotName)}>${children}</h4>`;
      }

      if (level === 5) {
        return html`<h5 slot=${ifDefined(slotName)}>${children}</h5>`;
      }

      if (level === 6) {
        return html`<h6 slot=${ifDefined(slotName)}>${children}</h6>`;
      }

      throw new Error(`Unsupported heading level: ${level}`);
    },
};
