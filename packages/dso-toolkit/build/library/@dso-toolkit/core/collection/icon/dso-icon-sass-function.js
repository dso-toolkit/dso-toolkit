import { instance as sass } from '@stencil/sass';
import cheerio from 'cheerio';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import svgToDataUri from 'mini-svg-data-uri';
const iconsPath = resolve(dirname(require.resolve('@dso-toolkit/styling')), 'icons');
// Replace this regex with the same logic as in @dso-toolkit/styling gulpfile.js
const styleRegex = (selector) => new RegExp(`${selector} {([\\s\\S]+?)}`);
export const dsoIcon = {
  'dso-icon($icon, $variant: null)': function (sassIconAlias, sassVariant) {
    if (!(sassIconAlias instanceof sass.types.String)) {
      throw new TypeError('Expected $icon to be of type String');
    }
    const iconAlias = sassIconAlias.getValue();
    const iconPath = resolve(iconsPath, `${iconAlias}.svg`);
    const icon = readFileSync(iconPath).toString('UTF-8');
    const style = getStyle(iconAlias, sassVariant instanceof sass.types.String ? sassVariant.getValue() : null);
    const svg = style ? bundleSvgStyle(icon, style) : icon;
    const dataUri = svgToDataUri(svg);
    return new sass.types.String(`url("${dataUri}")`);
  }
};
function getStyle(icon, variant) {
  var _a, _b;
  const stylesheetPath = resolve(iconsPath, `${icon}.scss`);
  if (!existsSync(stylesheetPath)) {
    return null;
  }
  const css = sass
    .renderSync({ file: stylesheetPath })
    .css
    .toString('UTF-8');
  const selector = `${icon}${variant ? `:${variant}` : ''}`;
  const regex = styleRegex(selector);
  return (_b = (_a = css.match(regex)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null;
}
function bundleSvgStyle(svg, style) {
  const $ = cheerio.load(svg, { xmlMode: true });
  const inlineStyle = style.trim().split('\n').map(l => l.trim()).join('');
  const $svg = $('svg').attr('style', inlineStyle);
  return $.html($svg);
}
