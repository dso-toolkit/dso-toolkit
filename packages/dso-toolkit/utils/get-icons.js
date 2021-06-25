const { readdirSync } = require('fs');
const { basename, join } = require('path');

function getIcons() {
  return readdirSync(join(__dirname, '../../sources/src/icons'))
    .filter(icon => icon.split('.').pop().toLowerCase() === 'svg')
    .map(icon => basename(icon, '.svg'));
}

module.exports = getIcons;
