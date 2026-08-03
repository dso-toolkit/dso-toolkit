import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Info } from "./info.models.js";

export function infoTemplate({ fixed, active, content, dsoClose, id }: Info<TemplateResult>) {
  return html`<dso-info ?fixed=${fixed} ?active=${active} @dsoClose=${dsoClose} id=${ifDefined(id)}
    >${content}</dso-info
  >`;
}
