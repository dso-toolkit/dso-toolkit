const collator = require('../../../.fractal/collator');
console.log(collator);
console.log(collator.defaultCollator);
console.log(collator.inlineCollator);
module.exports = {
  notes: `Plaats een badge. Een badge kan verschillende verschijningsvormen hebben, waarbij men op het <span> element naast de class '.dso-badge' een extra class zet.

    Default: '.dso-badge .badge-default'
    Info: '.dso-badge .badge-info'
    Primary: '.dso-badge .badge-primary'
    Success: '.dso-badge .badge-success'
    Warning: '.dso-badge .badge-warning'
    Error: '.dso-badge .badge-danger'`,
  status: 'wip',
  collated: true,
  collator: collator.inlineCollator,
  context: {
    label: 'Default',
    modifier: 'default'
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
