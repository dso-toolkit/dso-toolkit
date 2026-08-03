import { Link } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { iconTemplate } from "../icon/icon.core-template";

export function linkTemplate({ icon, iconMode, label, modifier, mode, url, ariaCurrent }: Link) {
  return html`<a
    href=${url}
    class=${ifDefined([modifier, mode].filter((c) => !!c).join(" ") || undefined)}
    aria-current=${ifDefined(ariaCurrent)}
    target=${ifDefined(mode === "extern" ? "_blank" : undefined)}
    rel=${ifDefined(mode === "extern" ? "noopener noreferrer" : undefined)}
    >${icon && iconMode !== "after" ? iconTemplate(icon) : nothing}${icon ? html`<span>${label}</span>` : label}${
      mode === "extern" ? html`<span class="sr-only">(Opent andere website in nieuw tabblad)</span>` : nothing
    }${icon && iconMode === "after" ? iconTemplate(icon) : nothing}</a
  >`;
}
