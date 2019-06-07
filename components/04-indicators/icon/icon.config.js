const icons = ['info', 'warning', 'check', 'cross', 'forbidden'];

module.exports = {
  collator: (markup, item) => `${markup} <code>${item.context.icon}</code><hr />`,
  status: 'ready',
  collated: true,
  default: 'info',
  variants: icons.map(icon => ({ name: icon, context: { icon: `di di-${icon}` } }))
};
