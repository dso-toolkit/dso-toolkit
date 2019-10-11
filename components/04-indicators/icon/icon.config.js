const fs = require('fs');
const path = require('path');

const icons = getIcons();

module.exports = {
  default: icons[0],
  collated: true,
  collator: function (markup, item) {
    return `<li><div>${markup}</div><code>${item.context.icon}</code></li>`;
  },
  context: {
    icon: 'user'
  },
  variants: icons.map(icon => ({ name: icon, context: { icon } }))
};

function getIcons() {
  return fs
    .readdirSync('src/icons')
    .filter(icon => icon.split('.').pop().toLowerCase() === 'svg')
    .map(icon => path.basename(icon, '.svg'));
}
