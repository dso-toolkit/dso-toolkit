import { Info } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ComponentImplementation } from "../../templates";

export const cssInfo: ComponentImplementation<Info<TemplateResult>> = {
  component: "info",
  implementation: "css",
  template: ({ buttonTemplate }) =>
    function infoTemplate({ fixed, content, dsoClose, id }) {
      return html`
        <div class="dso-info" id=${ifDefined(id)}>
          ${typeof content === "string" ? unsafeHTML(content) : content}
          ${!fixed ? buttonTemplate({ label: "Sluiten", variant: null, onClick: dsoClose, iconMode: "only" }) : nothing}
        </div>
      `;
    },
};
