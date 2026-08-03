import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { AdvancedSelect } from "./advanced-select.models.js";

export function advancedSelectTemplate({
  options,
  active,
  activeHint,
  dsoChange,
  dsoRedirect,
}: AdvancedSelect<TemplateResult>) {
  return html` <dso-advanced-select
    .options=${options}
    .active=${ifDefined(active)}
    .activeHint=${ifDefined(activeHint)}
    @dsoChange=${dsoChange}
    @dsoRedirect=${dsoRedirect}
  ></dso-advanced-select>`;
}
