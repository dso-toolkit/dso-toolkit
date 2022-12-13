import { HelpcenterPanel } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreHelpcenterPanel: ComponentImplementation<HelpcenterPanel> = {
  component: "helpcenterPanel",
  implementation: "core",
  template: () =>
    function helpcenterPanelTemplate({ label, url }) {
      return html`<dso-helpcenter-panel label=${ifDefined(label)} url=${url}></dso-helpcenter-panel>`;
    },
};
