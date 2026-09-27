import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Icon } from "./icon.models.js";

export function iconTemplate({ icon, slot }: Icon) {
  return html`<dso-icon icon=${icon} slot=${ifDefined(slot)}></dso-icon>`;
}
