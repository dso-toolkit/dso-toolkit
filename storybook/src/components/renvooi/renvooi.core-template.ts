import { Renvooi } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreRenvooi: ComponentImplementation<Renvooi> = {
  component: "renvooi",
  implementation: "core",
  template: () =>
    function renvooiTemplate({ value }) {
      return html`<dso-renvooi .value=${value}></dso-renvooi>`;
    },
};
