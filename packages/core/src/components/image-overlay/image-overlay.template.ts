import { html } from "lit-html";

import { imageTemplate } from "@dso-toolkit/css/src/components/image/image.template";
import { ImageOverlay } from '@dso-toolkit/sources';

export function imageOverlayTemplate({ image }: ImageOverlay) {
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
}
