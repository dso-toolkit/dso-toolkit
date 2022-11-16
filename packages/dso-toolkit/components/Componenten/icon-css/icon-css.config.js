const getIcons = require('../../../utils/get-icons');

const icons = getIcons();

module.exports = {
  label: 'Icon (CSS Component)',
  default: icons[0],
  collated: true,
  collator: function (markup, item) {
    return `<li><div>${markup}</div><code>${item.context.icon}</code></li>`;
  },
  variants: icons.map(icon => ({ name: icon, context: { icon } }))
};
