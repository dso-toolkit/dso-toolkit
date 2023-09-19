import { ButtonRow } from "dso-toolkit";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { ComponentImplementation } from "../../templates";

export const cssButtonRow: ComponentImplementation<ButtonRow> = {
  component: "buttonRow",
  implementation: "html-css",
  template: ({ buttonTemplate, anchorTemplate }) =>
    function buttonRowTemplate({ buttons, emphasized, align, noWrap }) {
      return html`<div
        class="dso-button-row ${classMap({
          "dso-emphasized": !!emphasized,
          [`dso-align-${align}`]: !!align,
          [`dso-no-wrap`]: !!noWrap,
        })}"
      >
        ${buttons.map((button) => ("variant" in button ? buttonTemplate(button) : anchorTemplate(button)))}
      </div>`;
    },
};
