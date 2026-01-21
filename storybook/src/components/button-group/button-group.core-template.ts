import { Button, ButtonAnchor, ButtonGroup, IconButton } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreButtonGroup: ComponentImplementation<ButtonGroup> = {
  component: "buttonGroup",
  implementation: "core",
  template: ({ buttonTemplate, iconButtonTemplate }) =>
    function buttonGroupTemplate({ direction, buttons }) {
      return html`<dso-button-group .direction=${ifDefined(direction)}>
        ${isIconButtons(buttons) ? buttons.map(iconButtonTemplate) : nothing}
        ${isButtons(buttons) ? buttons.map(buttonTemplate) : nothing}
      </dso-button-group>`;
    },
};

function isIconButtons(buttons: Array<Button | ButtonAnchor | IconButton>): buttons is Array<IconButton> {
  return buttons.some((b) => typeof b.icon === "string");
}

function isButtons(buttons: Array<Button | ButtonAnchor | IconButton>): buttons is Array<Button | ButtonAnchor> {
  return !isIconButtons(buttons);
}
