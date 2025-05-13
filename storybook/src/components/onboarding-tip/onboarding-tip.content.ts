import { html } from "lit-html";
import { Templates } from "../../templates";

export function richContent(templates: Templates) {
  const { linkTemplate, buttonRowTemplate, imageTemplate, richContentTemplate } = templates;

  return html`${richContentTemplate({
    children: html`<p>
        Uitleg over wat u hier kunt doen en lezen. Met een link naar
        ${linkTemplate({ label: "Meer informatie", url: "#", iconMode: "after", icon: { icon: "external-link" } })}.
      </p>
      <p>
        En ook een afbeelding: ${imageTemplate({ source: "images/sneeuwpop.png", alt: "Afbeelding van een sneeuwpop" })}
      </p>

      ${buttonRowTemplate({
        align: "right",
        buttons: [
          {
            label: "Niet Oké!",
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
