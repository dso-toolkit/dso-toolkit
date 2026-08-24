import { GridColumn } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreGridColumn: ComponentImplementation<GridColumn<TemplateResult>> = {
  component: "gridColumn",
  implementation: "core",
  template: () =>
    function gridColumnTemplate({ columns, overlay, dsoClose, content }: GridColumn<TemplateResult>) {
      return html`<dso-grid-column .columns=${columns} ?overlay=${overlay} @dsoClose=${dsoClose}>
        ${content}
      </dso-grid-column>`;
    },
};
