import { ButtonRow } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssButtonRow: ComponentImplementation<ButtonRow> = {
  component: "buttonRow",
  implementation: "html-css",
  template: ({ buttonTemplate, anchorTemplate }) =>
    function buttonRowTemplate({ buttons }) {
      return html`<div class="dso-button-row">
        ${buttons.map((button) => ("variant" in button ? buttonTemplate(button) : anchorTemplate(button)))}
      </div>`;
    },
};
