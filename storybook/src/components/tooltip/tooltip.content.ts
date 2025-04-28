import { HandlerFunction } from "@storybook/addon-actions";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { Templates } from "../../templates";

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

export function richContent(templates: Templates) {
  const { anchorTemplate, buttonRowTemplate, imageTemplate, richContentTemplate } = templates;

  return html`${richContentTemplate({
    children: html`<p>
        Uitleg over wat u hier kunt doen en lezen. Met een link naar
        ${anchorTemplate({ label: "Meer informatie", url: "#", iconMode: "after", icon: { icon: "external-link" } })}.
      </p>
      <p>
        En ook een afbeelding: ${imageTemplate({ source: "images/sneeuwpop.png", alt: "Afbeelding van een sneeuwpop" })}
      </p>

      ${buttonRowTemplate({
        align: "right",
        buttons: [
          {
            label: "Oké! Oké!",
            type: "button",
            variant: "secondary",
            onClick: () => null,
            icon: { icon: "chevron-left" },
          },
          {
            label: "Oké!",
            type: "button",
            variant: "primary",
            onClick: () => null,
            icon: { icon: "chevron-right" },
            iconMode: "after",
          },
        ],
      })}`,
  })}`;
}

export function headingContent(templates: Templates) {
  const { headingTemplate } = templates;

  return html`${headingTemplate({
    level: 5,
    children: "Tip: Onboarding",
    slotName: "heading",
  })}`;
}
