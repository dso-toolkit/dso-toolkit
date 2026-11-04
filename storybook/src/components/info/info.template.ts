import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Info } from "./info.models.js";

export function infoTemplate({ fixed, active, closeLabel, content, dsoClose, id }: Info) {
  return html`<dso-info
    ?fixed=${fixed}
    ?active=${active}
    close-label=${ifDefined(closeLabel)}
    @dsoClose=${dsoClose}
    id=${ifDefined(id)}
    >${content}</dso-info
  >`;
}
