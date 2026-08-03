import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Paragraph } from "./paragraph.models.js";

export function paragraphTemplate({ variant, content }: Paragraph) {
  return html`<p class=${ifDefined(variant ? "dso-disclaimer" : undefined)}>${content}</p>`;
}
