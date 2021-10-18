import { instance as sass } from '@stencil/sass';
import cheerio from 'cheerio';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import svgToDataUri from 'mini-svg-data-uri';

const iconsPath = resolve(dirname(require.resolve('@dso-toolkit/sources')), '../src', 'icons');

// Replace this regex with the same logic as in @dso-toolkit/css gulpfile.js
const styleRegex = (selector: string) => new RegExp(`${selector} {([\\s\\S]+?)}`);

export const dsoIcon = {
  'dso-icon($icon, $variant: null)': function (sassIconAlias: typeof sass.types.SassType, sassVariant: typeof sass.types.String | typeof sass.types.Null) {
    if (!(sassIconAlias instanceof sass.types.String)) {
      throw new TypeError('Expected $icon to be of type String');
    }

    const iconAlias = sassIconAlias.getValue();
    const iconPath = resolve(iconsPath, `${iconAlias}.svg`);

    const icon = readFileSync(iconPath).toString('utf-8');
    const style = getStyle(iconAlias, sassVariant instanceof sass.types.String ? sassVariant.getValue() : null);

    const svg = style ? bundleSvgStyle(icon, style) : icon;

    const dataUri = svgToDataUri(svg);

    return new sass.types.String(`url("${dataUri}")`);
  }
};

function getStyle(icon: string, variant: string | null): string | null {
  const stylesheetPath = resolve(iconsPath, `${icon}.scss`);

  if (!existsSync(stylesheetPath)) {
    return null;
  }

  const css = sass
    .renderSync({ file: stylesheetPath })
    .css
    .toString('utf-8');

  const selector = `${icon}${variant ? `:${variant}` : ''}`;
  const regex = styleRegex(selector);

  return css.match(regex)?.[1] ?? null;
}

function bundleSvgStyle(svg: string, style: string): string {
  const $ = cheerio.load(svg, { xmlMode: true });
  const inlineStyle = style.trim().split('\n').map(l => l.trim()).join('');

  const $svg = $('svg').attr('style', inlineStyle);

  return $.html($svg);
}
