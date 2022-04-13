import { html } from "lit-html";

import { imageTemplate } from '@dso-toolkit/css/src/components/image/image.template';
import { ImageOverlay } from '@dso-toolkit/sources';

export function imageOverlayTemplate({ image }: ImageOverlay) {
  return html`
    <dso-image-overlay>${imageTemplate(image)}</dso-image-overlay>
  `;
}
