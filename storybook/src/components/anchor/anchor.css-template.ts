import { Anchor } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const cssAnchor: ComponentImplementation<Anchor> = {
  component: "anchor",
  implementation: "html-css",
  template: ({ iconTemplate }) =>
    function anchorTemplate({ icon, iconMode, label, modifier, mode, url, ariaCurrent }) {
      return html`<a
        href=${url}
        class=${ifDefined([modifier, mode].filter((c) => !!c).join(" ") || undefined)}
        aria-current=${ifDefined(ariaCurrent)}
        target=${ifDefined(mode === "extern" ? "_blank" : undefined)}
        rel=${ifDefined(mode === "extern" ? "noopener noreferrer" : undefined)}
        >${icon && iconMode !== "after" ? iconTemplate(icon) : nothing}${icon
          ? html`<span>${label}</span>`
          : label}${mode === "extern"
          ? html`<span class="sr-only">(Opent andere website in nieuw tabblad)</span>`
          : nothing}${icon && iconMode === "after" ? iconTemplate(icon) : nothing}</a
      >`;
    },
};
