import { ButtonRow } from "dso-toolkit";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssButtonRow: ComponentImplementation<ButtonRow> = {
  component: "buttonRow",
  implementation: "html-css",
  template: ({ buttonTemplate, anchorTemplate }) =>
    function buttonRowTemplate({ buttons, emphasized }) {
      return html`<div class=${["dso-button-row", emphasized ? "dso-emphasized" : ""].join(" ")}>
        ${buttons.map((button) => ("variant" in button ? buttonTemplate(button) : anchorTemplate(button)))}
      </div>`;
    },
};
