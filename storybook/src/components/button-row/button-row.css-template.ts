import { ButtonRow } from "dso-toolkit";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { buttonTemplate } from "../button/button.css-template";
import { linkTemplate } from "../link/link.css-template";

export function buttonRowTemplate({ buttons, emphasized, align, noWrap }: ButtonRow) {
  return html`<div
    class="dso-button-row ${classMap({
      "dso-emphasized": !!emphasized,
      [`dso-align-${align}`]: !!align,
      [`dso-no-wrap`]: !!noWrap,
    })}"
  >
    ${buttons.map((button) => ("variant" in button ? buttonTemplate(button) : linkTemplate(button)))}
  </div>`;
}
