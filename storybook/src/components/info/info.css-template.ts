import { Info } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

export const cssInfo: ComponentImplementation<Info<TemplateResult>> = {
  component: "info",
  implementation: "html-css",
  template: ({ buttonTemplate }) =>
    function infoTemplate({ fixed, content, id, active }) {
      return html`${active || fixed
        ? html`
            <div class="dso-info" id=${ifDefined(id)}>
              ${typeof content === "string" ? unsafeHTML(content) : content}
              ${!fixed ? buttonTemplate({ label: "Sluiten", variant: null, iconMode: "only" }) : nothing}
            </div>
          `
        : nothing}`;
    },
};
