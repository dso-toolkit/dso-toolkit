const collator = require('../../../.fractal/collator');

module.exports = {
  status: 'wip',
  collated: true,
  collator: collator.inlineCollator,
  context: {
    label: 'Default',
  },
  variants: [
    {
      name: 'badge-info',
      context: {
        label: 'Info',
        modifier: 'info'
      }
    },
    {
      name: 'badge-primary',
      context: {
        label: 'Primary',
        modifier: 'primary'
      }
    },
    {
      name: 'badge-success',
      context: {
        label: 'Success',
        modifier: 'success'
      }
    },
    {
      name: 'badge-warning',
      context: {
        label: 'Warning',
        modifier: 'warning'
      }
    },
    {
      name: 'badge-danger',
      context: {
        label: 'Danger',
        modifier: 'danger'
      }
    }
  ]
};
