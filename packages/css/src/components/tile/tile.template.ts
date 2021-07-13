import { Tile } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { imageTemplate } from '../image/image.template';

export function tileTemplate({ anchor, image, label }: Tile) {
  return html`
    <div class="dso-tile">
      <a href=${anchor}>
        <span class="dso-tile-icon">
          ${imageTemplate(image)}
        </span>
        <span class="dso-tile-link">
          ${label}
        </span>
      </a>
    </div>
  `;
}
