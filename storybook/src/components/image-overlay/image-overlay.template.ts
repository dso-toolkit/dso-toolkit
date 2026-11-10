import { html, nothing } from "lit-html";

import { imageTemplate } from "../image/image.template.js";

import { ImageOverlay } from "./image-overlay.models.js";

export function imageOverlayTemplate({ image, title, bijschrift, wijzigactie }: ImageOverlay) {
  return html`
    <dso-image-overlay .wijzigactie=${wijzigactie}>
      ${
        title
          ? html`<div slot="titel">
              <span>${title}</span>
            </div>`
          : nothing
      }
      ${imageTemplate(image)}
      ${
        bijschrift
          ? html`<div slot="bijschrift">
              <span>${bijschrift.split("\n").map((line, i) => (i ? html`<br />${line}` : line))}</span>
            </div>`
          : nothing
      }
    </dso-image-overlay>
  `;
}
