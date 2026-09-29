import { TemplateResult, html } from "lit-html";

export function truncateTemplate(children: TemplateResult) {
  return html`<dso-truncate>${children}</dso-truncate>`;
}
