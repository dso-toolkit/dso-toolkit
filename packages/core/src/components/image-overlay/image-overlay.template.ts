import { ImageOverlay } from '@dso-toolkit/sources';

import { imageTemplate } from "@dso-toolkit/css/src/components/image/image.template";

import { html } from "lit-html";

export function imageOverlayTemplate({ image }: ImageOverlay) {
  return html`
    <dso-image-overlay>${imageTemplate(image)}</dso-image-overlay>
  `;
}
