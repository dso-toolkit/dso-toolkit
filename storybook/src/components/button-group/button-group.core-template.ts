import { ButtonGroup } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreButtonGroup: ComponentImplementation<ButtonGroup> = {
  component: "buttonGroup",
  implementation: "core",
  template: ({ buttonTemplate }) =>
    function buttonGroupTemplate({ direction, buttons }) {
      return html`<dso-button-group .direction=${ifDefined(direction)}>
        ${buttons.map(buttonTemplate)}
      </dso-button-group>`;
    },
};
