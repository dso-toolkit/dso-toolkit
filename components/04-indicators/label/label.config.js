const collator = require('../../../.fractal/collator');

module.exports = {
  status: 'wip',
  collated: true,
  collator: collator.inlineCollator,
  default: 'default',
  variants: [
    {
      name: 'default',
      context: {
        label: 'Default',
      }
    },
    {
      name: 'info',
      context: {
        label: 'Info',
        modifier: 'info'
      }
    },
    {
      name: 'primary',
      context: {
        label: 'Primary',
        modifier: 'primary'
      }
    },
    {
      name: 'success',
      context: {
        label: 'Success',
        modifier: 'success'
      }
    },
    {
      name: 'warning',
      context: {
        label: 'Warning',
        modifier: 'warning'
      }
    },
    {
      name: 'danger',
      context: {
        label: 'Danger',
        modifier: 'danger'
      }
    }
  ].reduce((total, variant) => total.concat([
    variant,
    Object.assign({}, variant, {
      name: `${variant.name}-button`,
      context: Object.assign({}, variant.context, {
        button: 'fas fa-times',
        buttonTitle: 'Verwijder'
      })
    })
  ]), [])
};
