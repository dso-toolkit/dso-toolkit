const fs = require('fs');
const path = require('path');

module.exports = {
  collated: true,
  collator: function (markup, item) {
    let html = '';

    const index = item.order - 1;

    if (index % 4 === 0) {
      html += '<div class="row">';
    }

    html += `<div class="col-md-3">${markup}</div>`;

    if (index % 4 === 3) {
      html += '</div>';
    }

    return html;
  },
  context: {
    icon: 'user'
  },
  variants: getIcons().map(icon => ({ name: icon, context: { icon } }))
};

function getIcons() {
  return fs
    .readdirSync('src/icons')
    .filter(icon => icon.split('.').pop().toLowerCase() === 'svg')
    .map(icon => path.basename(icon, '.svg'));
}
