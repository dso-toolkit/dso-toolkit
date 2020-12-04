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

    const path = resolve(iconsPath, `${icon.getValue()}.svg`);
    const svg = readFileSync(path).toString('UTF-8');
    const dataUri = svgToDataUri(svg);

    return new sass.types.String(`url("${dataUri}")`);
  }
};
