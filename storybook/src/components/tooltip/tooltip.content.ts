import { HandlerFunction } from "@storybook/addon-actions";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export function asChildTemplate(tooltip: TemplateResult, id: string, action: HandlerFunction) {
  return html`<button type="button" aria-describedby=${ifDefined(id || undefined)} @click=${action}>
    <span>Hover or focus me</span>${tooltip}
  </button>`;
}

export function asSiblingTemplate(tooltip: TemplateResult, id: string, action: HandlerFunction) {
  return html`
    <button type="button" aria-describedby=${ifDefined(id || undefined)} @click=${action}>
      <span>Hover or focus me</span>
    </button>
    ${tooltip}
  `;
}
