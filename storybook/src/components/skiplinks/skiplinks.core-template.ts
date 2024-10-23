import { Skiplinks } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreSkiplinks: ComponentImplementation<Skiplinks> = {
  component: "skiplinks",
  implementation: "core",
  template: () =>
    function skiplinksTemplate({}) {
      return html`<dso-skiplinks></dso-skiplinks>`;
    },
};
