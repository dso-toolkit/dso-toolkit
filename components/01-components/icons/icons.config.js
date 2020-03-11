const fs = require('fs');
const path = require('path');

const icons = getIcons();

module.exports = {
  notes: `
  * Een namespace attribuut is niet nodig als het icoon in een HTML5 applicatie wordt gebruikt (https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg).
  * In het \`use\` element mag direct \`href\` ipv \`xlink:href\` worden gebruikt. In SVG2 is \`xlink:href\` deprecated (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href).
  * In bovenstaand voorbeeld verwijs ik naar \`dso-icons.svg\`:
    * Als de toolkit scss files worden gecompileerd, moet de implementatie zorg dragen dat uiteindelijk \`node_modules/dso-toolkit/dist/library/dso-icons.svg\` wordt gebundled;
    * Als de toolkit via de CDN wordt gebruikt werken SVG iconen direct;
    * Als de toolkit de CSS uit de NPM package gebruikt moeten de bundlers/loaders rekening houden dat de SVG files worden meegenomen in de build;
  * IE11 heeft geen support voor \`use href\` naar een externe URI of data URI. Elke implementatie van de toolkit moet deze tekortkoming compenseren. De library is ook een implementatie van de toolkit en maakt gebruik van www.dso-toolkit.nl) maakt gebruik van [svg4everybody](https://github.com/jonathantneal/svg4everybody).
`,
  default: icons[0],
  collated: true,
  collator: function (markup, item) {
    return `<li><div>${markup}</div><code>${item.context.icon}</code></li>`;
  },
  variants: icons.map(icon => ({ name: icon, context: { icon } }))
};

function getIcons() {
  return fs
    .readdirSync('src/icons')
    .filter(icon => icon.split('.').pop().toLowerCase() === 'svg')
    .map(icon => path.basename(icon, '.svg'));
}
