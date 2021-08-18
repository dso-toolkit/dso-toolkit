import { Toggletip } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export function toggletipTemplate({ children }: Toggletip<TemplateResult>) {
  return html`<dso-toggletip>${unsafeHTML(children)}</dso-toggletip>`;
}
