import { Tile } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import { imageTemplate } from '../image/image.template';

export function tileTemplate({ anchor, image, label, variant }: Tile) {
  return html`
    <div class="dso-tile ${classMap({ 'dso-theme': variant === 'theme' })}">
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
