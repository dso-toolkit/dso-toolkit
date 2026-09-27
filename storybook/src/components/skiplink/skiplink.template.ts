import { html } from "lit-html";

import { Skiplink } from "./skiplink.models.js";

export function skiplinkTemplate({ to, label, dsoSkiplinkClick }: Skiplink) {
  return html`<dso-skiplink to=${to} label=${label} @dsoSkiplinkClick=${dsoSkiplinkClick}></dso-skiplink>`;
}
