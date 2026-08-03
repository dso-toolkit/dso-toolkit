import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { RichContent } from "./rich-content.models.js";

export function richContentTemplate({ children, slot }: RichContent<TemplateResult>) {
  return html`<div class="dso-rich-content" slot=${ifDefined(slot)}>${children}</div>`;
}
