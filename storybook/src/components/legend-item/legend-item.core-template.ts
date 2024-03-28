import { LegendItem } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ComponentImplementation } from "../../templates";

export const coreLegendItem: ComponentImplementation<LegendItem<TemplateResult>> = {
  component: "legendItem",
  implementation: "core",
  template: ({ selectableTemplate }) =>
    function legendItemTemplate({
      body,
      disabled,
      dsoMouseEnter,
      dsoMouseLeave,
      dsoRemoveClick,
      label,
      removable,
      selectable,
      symbol,
    }) {
      return html`
        <dso-legend-item
          ?removable=${removable}
          ?disabled=${disabled}
          @dsoMouseEnter=${dsoMouseEnter}
          @dsoMouseLeave=${dsoMouseLeave}
          @dsoRemoveClick=${ifDefined(dsoRemoveClick)}
        >
          ${symbol ? html`<span slot="symbol"> ${unsafeHTML(symbol)} </span>` : nothing}
          ${selectable ? selectableTemplate(selectable) : nothing} ${label ? unsafeHTML(label) : nothing}
          ${body ? html`<div slot="body">${body}</div>` : nothing}</dso-legend-item
        >
      `;
    },
};
