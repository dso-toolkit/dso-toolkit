import { Button, ButtonAnchor, ButtonGroup, IconButton } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreButtonGroup: ComponentImplementation<ButtonGroup> = {
  component: "buttonGroup",
  implementation: "core",
  template: ({ buttonTemplate, iconButtonTemplate }) =>
    function buttonGroupTemplate({ direction, buttons }) {
      return html`<dso-button-group .direction=${ifDefined(direction)}>
        ${buttons.map((button) => (isIconButton(button) ? iconButtonTemplate(button) : buttonTemplate(button)))}
      </dso-button-group>`;
    },
};

function isIconButton(button: Button | ButtonAnchor | IconButton): button is IconButton {
  return typeof button.icon === "string";
}
