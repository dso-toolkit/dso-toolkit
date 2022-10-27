import { HelpcenterPanel } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ComponentImplementation } from "../../templates";

export const coreHelpcenterPanel: ComponentImplementation<HelpcenterPanel> = {
  component: 'helpcenterPanel',
  implementation: 'core',
  template: () => function helpcenterPanelTemplate({
    label,
    url,
    content,
  }) {
    return html`
      ${unsafeHTML(content)}
      <dso-helpcenter-panel
        label=${ifDefined(label)}
        url=${url}
      ></dso-helpcenter-panel>
      ${unsafeHTML(content)}
    `;
  }
}
