import { LegendItem } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
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
      dsoRemoveClick,
      removable,
      symbol,
    }) {
      return html`
        <dso-legend-item
          ?removable=${removable}
          ?disabled=${disabled}
          .disabledMessage=${disabledMessage}
          @dsoMouseEnter=${ifDefined(dsoMouseEnter)}
          @dsoMouseLeave=${ifDefined(dsoMouseLeave)}
          @dsoRemoveClick=${ifDefined(dsoRemoveClick)}
        >
          ${symbol ? html`<span slot="symbol">${symbol}</span>` : nothing} ${content}
          ${body ? html`<div slot="body">${body}</div>` : nothing}
        </dso-legend-item>
      `;
    },
};
