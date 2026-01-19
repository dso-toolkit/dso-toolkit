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
        ${isIconButtons(buttons)
          ? (buttons as Array<IconButton>).map(iconButtonTemplate)
          : (buttons as Array<Button | ButtonAnchor>).map(buttonTemplate)}
      </dso-button-group>`;
    },
};

function isIconButtons(buttons: Array<Button | ButtonAnchor | IconButton>) {
  return buttons.some((b) => typeof b.icon === "string");
}
