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
      name: 'label-info',
      context: {
        label: 'Info',
        modifier: 'info'
      }
    },
    {
      name: 'label-primary',
      context: {
        label: 'Primary',
        modifier: 'primary'
      }
    },
    {
      name: 'label-success',
      context: {
        label: 'Success',
        modifier: 'success'
      }
    },
    {
      name: 'label-warning',
      context: {
        label: 'Warning',
        modifier: 'warning'
      }
    },
    {
      name: 'label-danger',
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
        button: 'fa fa-times',
        buttonTitle: 'Verwijder'
      })
    })
  ]), [])
};
