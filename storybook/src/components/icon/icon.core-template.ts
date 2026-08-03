import { Icon } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export function iconTemplate({ icon, slot }: Icon) {
  return html`<dso-icon icon=${icon} slot=${ifDefined(slot)}></dso-icon>`;
}
