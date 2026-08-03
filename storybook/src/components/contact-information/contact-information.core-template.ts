import { ContactInformation } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";

import { headingTemplate } from "../heading/heading.css-template";
import { linkTemplate } from "../link/link.css-template";

export function contactInformationTemplate({ heading, linkItems, infoItems }: ContactInformation<TemplateResult>) {
  return html`<dso-contact-information>
    ${
      heading
        ? headingTemplate({
            ...heading,
            slotName: "heading",
          })
        : nothing
    }
    ${
      linkItems && linkItems.length > 0
        ? html`
            <ul slot="anchor-items">
              ${linkItems.map((anchor) => html`<li>${linkTemplate(anchor)}</li>`)}
            </ul>
          `
        : nothing
    }
    ${
      infoItems && infoItems.length > 0
        ? html`
            <ul slot="info-items">
              ${infoItems.map((infoItem) => html`<li>${infoItem}</li>`)}
            </ul>
          `
        : nothing
    }
  </dso-contact-information>`;
}
