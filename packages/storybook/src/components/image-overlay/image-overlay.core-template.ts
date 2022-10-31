import { html } from "lit-html";

import { ImageOverlay } from "@dso-toolkit/sources";
import { ComponentImplementation } from "../../templates";

export const coreImageOverlay: ComponentImplementation<ImageOverlay> = {
  component: "imageOverlay",
  implementation: "core",
  template: ({ imageTemplate }) =>
    function imageOverlayTemplate({ image }) {
      return html`
        <dso-image-overlay>
          <div slot="titel">
            <span>Afbeelding 1</span>
          </div>
          ${imageTemplate(image)}
          <div slot="bijschrift">
            <span>Bijschrift bij afbeelding</span>
          </div>
        </dso-image-overlay>
      `;
    },
};
