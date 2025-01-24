import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { ContactInformation } from "dso-toolkit";

export const coreContactInformation: ComponentImplementation<ContactInformation> = {
  component: "contactInformation",
  implementation: "core",
  template: ({ anchorTemplate }) =>
    function contactInformationTemplate({ heading, anchors, infoItems }: ContactInformation) {
      return html`<dso-contact-information>
        ${html`
          <h5 slot="heading">${heading}</h5>
          <ul slot="anchors">
            ${anchors.map(
              (anchor) => html`
                <li>
                  ${anchorTemplate({
                    label: anchor.label,
                    url: anchor.url,
                    icon: anchor.icon && anchor.icon,
                    mode: anchor.mode && anchor.mode,
                  })}
                </li>
              `,
            )}
          </ul>
          <ul slot="info">
            ${infoItems.map((infoItem) => html` <li>${infoItem}</li> `)}
          </ul>
        `}
      </dso-contact-information>`;
    },
};
