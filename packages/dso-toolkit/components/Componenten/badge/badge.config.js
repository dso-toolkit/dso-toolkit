const collator = require('../../../fractal/collator');

module.exports = {
  meta: {
    webComponent: 'dso-badge'
  },
  status: 'ready',
  collated: true,
  collator: collator.inlineCollator,
  context: {
    label: 'Badge tekst'
  },
  variants: [
    {
      name: 'badge-info',
      context: {
        status: 'info'
      }
    },
    {
      name: 'badge-primary',
      context: {
        status: 'primary'
      }
    },
    {
      name: 'badge-success',
      context: {
        status: 'success'
      }
    },
    {
      name: 'badge-warning',
      context: {
        status: 'warning'
      }
    },
    {
      name: 'badge-danger',
      context: {
        status: 'danger'
      }
    },
    {
      name: 'badge-outline',
      context: {
        status: 'outline'
      }
    }
  ]
};
