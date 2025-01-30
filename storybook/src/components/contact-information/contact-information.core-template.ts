import { html, nothing, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { ContactInformation } from "dso-toolkit";

export const coreContactInformation: ComponentImplementation<ContactInformation<TemplateResult>> = {
  component: "contactInformation",
  implementation: "core",
  template: ({ anchorTemplate, headingTemplate }) =>
    function contactInformationTemplate({ heading, anchorItems, infoItems }) {
      return html` <dso-contact-information>
        ${heading
          ? headingTemplate({
              ...heading,
              slotName: "heading",
            })
          : nothing}
        ${anchorItems
          ? html`
              <ul slot="anchor-items">
                ${anchorItems.map((anchor) => html`<li>${anchorTemplate(anchor)}</li>`)}
              </ul>
            `
          : nothing}
        ${infoItems
          ? html`
              <ul slot="info-items">
                ${infoItems.map((infoItem) => html`<li>${infoItem}</li>`)}
              </ul>
            `
          : nothing}
      </dso-contact-information>`;
    },
};
