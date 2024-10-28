import { Skiplink } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreSkiplink: ComponentImplementation<Skiplink> = {
  component: "skiplink",
  implementation: "core",
  template: () =>
    function skiplinkTemplate({}) {
      return html`<dso-skiplink to="inhoud" label="Ga naar inhoud"></dso-skiplink>`;
    },
};
