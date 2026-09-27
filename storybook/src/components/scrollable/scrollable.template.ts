import { html } from "lit-html";

import { Scrollable } from "./scrollable.models.js";

export function scrollableTemplate({ children, dsoScrollEnd }: Scrollable) {
  return html`<dso-scrollable @dsoScrollEnd=${dsoScrollEnd}>${children}</dso-scrollable>`;
}
