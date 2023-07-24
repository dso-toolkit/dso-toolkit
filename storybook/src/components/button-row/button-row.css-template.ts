import { ButtonRow } from "dso-toolkit";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";
import { classMap } from "lit-html/directives/class-map.js";

export const cssButtonRow: ComponentImplementation<ButtonRow> = {
  component: "buttonRow",
  implementation: "html-css",
  template: ({ buttonTemplate, anchorTemplate }) =>
    function buttonRowTemplate({ buttons, emphasized, align }) {
      return html`<div
        class="dso-button-row ${classMap({ "dso-emphasized": !!emphasized, [`dso-align-${align}`]: !!align })}"
      >
        ${buttons.map((button) => ("variant" in button ? buttonTemplate(button) : anchorTemplate(button)))}
      </div>`;
    },
};
