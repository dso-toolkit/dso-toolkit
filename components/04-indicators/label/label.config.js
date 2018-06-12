const collator = require('../../../.fractal/collator');

module.exports = {
  notes: `Plaats een label. Een label kan verschillende verschijningsvormen hebben, waarbij men op het <span> element naast de class '.dso-label' een extra class zet.

    Default: '.dso-label .label-default'
    Info: '.dso-label .label-info'
    Primary: '.dso-label .label-primary'
    Success: '.dso-label .label-success'
    Warning: '.dso-label .label-warning'
    Error: '.dso-label .label-danger'

    Om een label met sluitknop te krijgen moet '.closable' worden toegevoegd op het niveau van '.label'.`,
  status: 'wip',
  collated: true,
  collator: collator.inlineCollator,
  context: {
    label: 'Default',
    modifier: 'default',
    buttonText: 'Sluiten'
  },
  variants: [
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
    },
    {
      name: 'label-filter',
      context: {
        label: 'Filter label',
        modifier: 'default has-button'
      }
    }
  ]
};
