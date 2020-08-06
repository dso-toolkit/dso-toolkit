const collator = require('../../../.fractal/collator');

module.exports = {
  status: 'ready',
  collated: true,
  collator: collator.inlineCollator,
  context: {
    status: 'Badge',
    label: 'Badge tekst'
  },
  variants: [
    {
      name: 'badge-info',
      context: {
        status: 'Info',
        modifier: 'info'
      }
    },
    {
      name: 'badge-primary',
      context: {
        status: 'Primair',
        modifier: 'primary'
      }
    },
    {
      name: 'badge-success',
      context: {
        status: 'Succes',
        modifier: 'success'
      }
    },
    {
      name: 'badge-warning',
      context: {
        status: 'Waarschuwing',
        modifier: 'warning'
      }
    },
    {
      name: 'badge-danger',
      context: {
        status: 'Gevaar',
        modifier: 'danger'
      }
    }
  ]
};
