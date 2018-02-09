module.exports = {
  notes: 'Plaats een label. Gebaseerd op de Bootstrap \'Label\' component',
  status: 'ready',
  collated: true,
  collator: markup => markup,
  context: {
    label: 'Default',
    modifier: 'default'
  },
  variants: [{
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
    name: 'info',
    context: {
      label: 'Info',
      modifier: 'info'
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
  }]
};
