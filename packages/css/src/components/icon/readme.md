# `svg.di`

- Een namespace attribuut is niet nodig als het icoon in een HTML5 applicatie wordt gebruikt (https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg).
- In het \`use\` element mag direct \`href\` ipv \`xlink:href\` worden gebruikt. In SVG2 is \`xlink:href\` deprecated (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href).
- In bovenstaand voorbeeld verwijs ik naar \`dso-icons.svg\`:
  - Als de toolkit scss files worden gecompileerd, moet de implementatie zorg dragen dat uiteindelijk \`node_modules/dso-toolkit/dist/library/dso-icons.svg\` wordt gebundled;
  - Als de toolkit via de CDN wordt gebruikt werken SVG iconen direct;
  - Als de toolkit de CSS uit de NPM package gebruikt moeten de bundlers/loaders rekening houden dat de SVG files worden meegenomen in de build;
