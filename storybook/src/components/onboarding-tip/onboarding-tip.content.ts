import { html } from "lit-html";

import { buttonRowTemplate } from "../button-row/button-row.template.js";
import { headingTemplate } from "../heading/heading.template.js";
import { imageTemplate } from "../image/image.template.js";
import { linkTemplate } from "../link/link.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

export function richContent() {
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

export function headingContent() {
  return html`${headingTemplate({
    level: 5,
    children: "Tip: Onboarding",
    slotName: "heading",
  })}`;
}
