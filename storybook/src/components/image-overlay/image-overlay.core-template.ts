import { ImageOverlay } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreImageOverlay: ComponentImplementation<ImageOverlay> = {
  component: "imageOverlay",
  implementation: "core",
  template: ({ imageTemplate }) =>
    function imageOverlayTemplate({ image, title }) {
      return html`
        <dso-image-overlay>
          <div slot="titel">
            <span>${title}</span>
          </div>
          ${imageTemplate(image)}
          <div slot="bijschrift">
            <span>Bijschrift bij afbeelding</span>
          </div>
        </dso-image-overlay>
      `;
    },
};
