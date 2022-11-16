const getIcons = require('../../../utils/get-icons');

const icons = getIcons();

module.exports = {
  label: 'Icon (Web Component) 🚀', // Fake the web component rocket indicator, Stencil's Hydrate function removes <style> elements which contain icon table styling.
  default: icons[0],
  collated: true,
  collator: function (markup, item) {
    return `<li><div>${markup}</div><code>${item.context.icon}</code></li>`;
  },
  variants: icons.map(icon => ({ name: icon, context: { icon } }))
};
