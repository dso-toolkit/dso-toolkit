import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { Image } from '@dso-toolkit/sources';

export function imageTemplate({ source, modifier, alt, width, height }: Image) {
  return html`
    <img
      src=${source}
      class=${ifDefined(modifier)}
      alt=${alt}
      width=${ifDefined(width)}
      height=${ifDefined(height)}
    >
  `;
}
