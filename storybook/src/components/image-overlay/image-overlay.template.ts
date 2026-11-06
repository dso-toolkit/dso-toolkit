import { html, nothing } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { imageTemplate } from "../image/image.template.js";

import { ImageOverlay } from "./image-overlay.models.js";

export function imageOverlayTemplate({ image, title, bijschrift }: ImageOverlay) {
  return html`
    <dso-image-overlay>
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
              <span>${unsafeHTML(bijschrift.split("\n").join("<br />"))}</span>
            </div>`
          : nothing
      }
    </dso-image-overlay>
  `;
}
