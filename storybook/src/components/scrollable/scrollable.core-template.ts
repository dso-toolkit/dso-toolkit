import { Scrollable } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export function scrollableTemplate({ children, dsoScrollEnd }: Scrollable<TemplateResult>) {
  return html`<dso-scrollable @dsoScrollEnd=${dsoScrollEnd}>${children}</dso-scrollable>`;
}
