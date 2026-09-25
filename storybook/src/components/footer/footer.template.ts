import { html } from "lit-html";

import { Footer } from "./footer.models.js";

export function footerTemplate({ children }: Footer) {
  return html`<footer>${children}</footer>`;
}
