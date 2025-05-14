import { html, nothing, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { ContactInformation } from "dso-toolkit";

export const coreContactInformation: ComponentImplementation<ContactInformation<TemplateResult>> = {
  component: "contactInformation",
  implementation: "core",
  template: ({ linkTemplate, headingTemplate }) =>
    function contactInformationTemplate({ heading, linkItems, infoItems }) {
      return html`<dso-contact-information>
        ${heading
          ? headingTemplate({
              ...heading,
              slotName: "heading",
            })
          : nothing}
        ${linkItems && linkItems.length > 0
          ? html`
              <ul slot="anchor-items">
                ${linkItems.map((anchor) => html`<li>${linkTemplate(anchor)}</li>`)}
              </ul>
            `
          : nothing}
        ${infoItems && infoItems.length > 0
          ? html`
              <ul slot="info-items">
                ${infoItems.map((infoItem) => html`<li>${infoItem}</li>`)}
              </ul>
            `
          : nothing}
      </dso-contact-information>`;
    },
};
