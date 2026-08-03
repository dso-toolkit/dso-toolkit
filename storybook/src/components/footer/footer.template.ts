import { TemplateResult, html } from "lit-html";

import { Footer } from "./footer.models.js";

export function footerTemplate({ children }: Footer<TemplateResult>) {
  return html`<footer>${children}</footer>`;
}
