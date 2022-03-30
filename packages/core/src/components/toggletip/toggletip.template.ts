import { Toggletip } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export function toggletipTemplate({
  children,
  label,
  position,
  small,
  secondary,
}: Toggletip) {
  return html`<dso-toggletip
    label=${ifDefined(label)}
    position=${ifDefined(position)}
    ?small=${small}
    ?secondary=${secondary}
    >${unsafeHTML(children)}</dso-toggletip
  >`;
}
