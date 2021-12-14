import { HelpcenterPanel } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export function helpcenterPanelTemplate({
  label,
  url,
  content,
}: HelpcenterPanel) {
  return html`
    ${unsafeHTML(content)}
    <dso-helpcenter-panel
      label=${ifDefined(label)}
      url=${url}
    ></dso-helpcenter-panel>
    ${unsafeHTML(content)}
  `;
}
