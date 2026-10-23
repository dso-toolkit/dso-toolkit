import { html } from "lit-html";

import { imageTemplate } from "../image/image.template.js";

import { ImageOverlay } from "./image-overlay.models.js";

export function imageOverlayTemplate({ image, title }: ImageOverlay) {
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
}
