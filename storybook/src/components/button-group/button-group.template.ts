import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Button, ButtonAnchor } from "../button/button.models.js";
import { buttonTemplate } from "../button/button.template.js";
import { IconButton } from "../icon-button/icon-button.models.js";
import { iconButtonTemplate } from "../icon-button/icon-button.template.js";

import { ButtonGroup } from "./button-group.models.js";

export function buttonGroupTemplate({ direction, buttons }: ButtonGroup) {
  return html`<dso-button-group .direction=${ifDefined(direction)}>
    ${isIconButtons(buttons) ? buttons.map(iconButtonTemplate) : nothing}
    ${isButtons(buttons) ? buttons.map(buttonTemplate) : nothing}
  </dso-button-group>`;
}

function isIconButtons(buttons: Array<Button | ButtonAnchor | IconButton>): buttons is Array<IconButton> {
  return buttons.some((b) => typeof b.icon === "string");
}

function isButtons(buttons: Array<Button | ButtonAnchor | IconButton>): buttons is Array<Button | ButtonAnchor> {
  return !isIconButtons(buttons);
}
