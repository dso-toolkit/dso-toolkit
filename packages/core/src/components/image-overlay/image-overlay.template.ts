import { html } from "lit-html";

import { ImageOverlay } from '@dso-toolkit/sources';
import { imageTemplate } from '../../../../css/src/components/image/image.template';

export function imageOverlayTemplate({ image }: ImageOverlay) {
  return html`
    <dso-image-overlay>${imageTemplate(image)}</dso-image-overlay>
  `;
}
