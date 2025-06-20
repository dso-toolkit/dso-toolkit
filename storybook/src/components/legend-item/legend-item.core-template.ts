import { LegendItem } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreLegendItem: ComponentImplementation<LegendItem<TemplateResult>> = {
  component: "legendItem",
  implementation: "core",
  template: () =>
    function legendItemTemplate({
      body,
      content,
      disabled,
      disabledMessage,
      dsoMouseEnter,
      dsoMouseLeave,
      dsoActiveChange,
      active,
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
        >
          ${symbol ? html`<span slot="symbol">${symbol}</span>` : nothing} ${content}
          ${body ? html`<div slot="body">${body}</div>` : nothing}
        </dso-legend-item>
      `;
    },
};
