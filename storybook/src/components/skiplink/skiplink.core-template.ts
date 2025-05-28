import { Skiplink } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreSkiplink: ComponentImplementation<Skiplink> = {
  component: "skiplink",
  implementation: "core",
  template: () =>
    function skiplinkTemplate({ to, label, dsoSkiplinkClick }) {
      return html`<dso-skiplink to=${to} label=${label} @dsoSkiplinkClick=${dsoSkiplinkClick}></dso-skiplink>`;
    },
};
