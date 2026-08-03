import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { buttonTemplate } from "../button/button.template.js";
import { linkTemplate } from "../link/link.template.js";

import { ButtonRow } from "./button-row.models.js";

export function buttonRowTemplate({ buttons, emphasized, align, noWrap }: ButtonRow) {
  return html`<div
    class="dso-button-row ${classMap({
      "dso-emphasized": !!emphasized,
      [`dso-align-${align}`]: !!align,
      "dso-no-wrap": !!noWrap,
    })}"
  >
    ${buttons.map((button) => ("variant" in button ? buttonTemplate(button) : linkTemplate(button)))}
  </div>`;
}
