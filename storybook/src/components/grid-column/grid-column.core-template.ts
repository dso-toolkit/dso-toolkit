import { GridColumn } from "dso-toolkit/src/components/grid-column/grid-column.models.js";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreGridColumn: ComponentImplementation<GridColumn<TemplateResult>> = {
  component: "gridColumn",
  implementation: "core",
  template: () =>
    function gridColumnTemplate({ columns, overlay, content }: GridColumn<TemplateResult>) {
      return html`<dso-grid-column .columns=${columns} ?overlay=${overlay}> ${content} </dso-grid-column>`;
    },
};
