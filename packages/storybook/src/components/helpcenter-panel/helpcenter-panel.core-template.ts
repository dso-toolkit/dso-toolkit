import { HelpcenterPanel } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreHelpcenterPanel: ComponentImplementation<HelpcenterPanel<TemplateResult>> = {
  component: "helpcenterPanel",
  implementation: "core",
  template: () =>
    function helpcenterPanelTemplate({ label, url, content }) {
      return html`
        ${content}
        <dso-helpcenter-panel label=${ifDefined(label)} url=${url}></dso-helpcenter-panel>
        ${content}
      `;
    },
};
