import { html } from "lit-html";

import { iconTemplate } from "../icon/icon.template.js";

export function itemWarning() {
  return "Voor deze werkzaamheid is op dit moment geen informatie beschikbaar.";
}

export function warningExplanation() {
  return html`
    <strong>Let op:</strong> Voor de werkzaamheden met een ${iconTemplate({ icon: "status-warning" })} is op dit moment
    geen informatie beschikbaar. Neem contact op met uw gemeente of waterschap om te weten wat u moet doen.
  `;
}
