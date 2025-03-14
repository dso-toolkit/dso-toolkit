import { Renvooi } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreRenvooi: ComponentImplementation<Renvooi> = {
  component: "renvooi",
  implementation: "core",
  template: () =>
    function renvooiTemplate({ value, mark, dsoRenvooiMarkItemHighlight }) {
      return html`<dso-renvooi
        .value=${value}
        .mark=${ifDefined(mark)}
        @dsoRenvooiMarkItemHighlight=${dsoRenvooiMarkItemHighlight}
      ></dso-renvooi>`;
    },
};
