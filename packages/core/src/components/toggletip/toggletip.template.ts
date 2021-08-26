import { Toggletip } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export function toggletipTemplate({
  children,
  label,
  position,
}: Toggletip<TemplateResult>) {
  return html`<dso-toggletip
    label=${ifDefined(label)}
    position=${ifDefined(position)}
    >${unsafeHTML(children)}</dso-toggletip
  >`;
}
