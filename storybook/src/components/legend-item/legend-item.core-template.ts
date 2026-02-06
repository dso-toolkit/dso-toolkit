import { LegendItem } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreLegendItem: ComponentImplementation<LegendItem<TemplateResult>> = {
  component: "legendItem",
  implementation: "core",
  template: () =>
    function legendItemTemplate({
      options,
      content,
      disabled,
      disabledMessage,
      dsoMouseEnter,
      dsoMouseLeave,
      dsoActiveChange,
      active,
      activatable,
      mode,
      symbol,
    }) {
      return html`
        <dso-legend-item
          ?disabled=${disabled}
          .disabledMessage=${disabledMessage}
          @dsoMouseEnter=${ifDefined(dsoMouseEnter)}
          @dsoMouseLeave=${ifDefined(dsoMouseLeave)}
          @dsoActiveChange=${ifDefined(dsoActiveChange)}
          .active=${active}
          .activatable=${activatable}
          .mode=${ifDefined(mode)}
        >
          ${symbol ? html`<span slot="symbol">${symbol}</span>` : nothing} ${content}
          ${options ? html`<div slot="options">${options}</div>` : nothing}
        </dso-legend-item>
      `;
    },
};
