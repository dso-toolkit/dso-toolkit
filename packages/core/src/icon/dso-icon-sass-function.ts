import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import svgToDataUri from 'mini-svg-data-uri';

import { instance as sass } from '@stencil/sass';

const iconsPath = resolve(dirname(require.resolve('@dso-toolkit/styling')), 'icons');

export const dsoIcon = {
  'dso-icon($path)': function (icon: typeof sass.types.SassType) {
    if (!(icon instanceof sass.types.String)) {
      throw new TypeError('Expected $icon to be of type String');
    }

    const svg = readFileSync(resolve(iconsPath, `${icon.getValue()}.svg`)).toString('UTF-8');

    return new sass.types.String(`url("${svgToDataUri(svg)}")`);
  }
};
