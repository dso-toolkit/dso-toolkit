const fs = require('fs');
const path = require('path');

const icons = getIcons();

module.exports = {
  label: 'Icons',
  notes: `
  Iconen helpen gebruikers om taken te herkennen en te onthouden. Door iconen te
  gebruiken, biedt u de informatie ook op een visuele manier aan, wat voor sommige
  gebruikers prettiger werkt. Geef de iconen waar mogelijk labels.

  ## Hoe te gebruiken: bestandsformaten en afmetingen
  Er zijn twee soorten iconen: illustratieve iconen en gebruikersinterface-iconen. Illustratieve iconen komen aan bod op de pagina Illustraties. Lever iconen aan in SVG-formaat. In dit formaat schalen iconen mee en blijven ze altijd scherp.

  **Gebruikersinterface-iconen**
  - Pixelformaat: 24x24.
  - Format: Scalable Vector Graphics (SVG) 1.1 (Second Edition).
  - Kleur: wordt aangeleverd in zwart, kleur is te veranderen via CSS.
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
