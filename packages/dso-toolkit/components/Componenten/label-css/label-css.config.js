module.exports = {
  label: 'Label (CSS)',
  status: 'ready',
  collated: true,
  collator: (markup, item) => `<div class="col-xs-4" style="height: 3em;"><p>${item.context._ignore ? '' : markup}</p></div>`,
  default: 'default',
  variants: [
    {
      name: 'default',
      context: {
        label: 'Label tekst'
      }
    },
    {
      name: 'default button',
      context: {
        label: 'Label tekst',
        removable: true
      }
    },
    {
      name: 'default compact',
      context: {
        label: 'Label tekst',
        compact: true
      }
    },
    {
      name: 'info',
      context: {
        status: 'info',
        label: 'Label tekst'
      }
    },
    {
      name: 'info button',
      context: {
        status: 'info',
        label: 'Label tekst',
        removable: true
      }
    },
    {
      name: 'info compact',
      context: {
        status: 'info',
        label: 'Label tekst',
        compact: true
      }
    },
    {
      name: 'primary',
      context: {
        status: 'primary',
        label: 'Label tekst'
      }
    },
    {
      name: 'primary button',
      context: {
        status: 'primary',
        label: 'Label tekst',
        removable: true
      }
    },
    {
      name: 'primary compact',
      context: {
        status: 'primary',
        label: 'Label tekst',
        compact: true
      }
    },
    {
      name: 'success',
      context: {
        status: 'success',
        label: 'Label tekst'
      }
    },
    {
      name: 'success button',
      context: {
        status: 'success',
        label: 'Label tekst',
        removable: true
      }
    },
    {
      name: 'success compact',
      context: {
        status: 'success',
        label: 'Label tekst',
        compact: true
      }
    },
    {
      name: 'warning',
      context: {
        status: 'warning',
        label: 'Label tekst'
      }
    },
    {
      name: 'warning button',
      context: {
        status: 'warning',
        label: 'Label tekst',
        removable: true
      }
    },
    {
      name: 'warning compact',
      context: {
        status: 'warning',
        label: 'Label tekst',
        compact: true
      }
    },
    {
      name: 'danger',
      context: {
        status: 'danger',
        label: 'Label tekst'
      }
    },
    {
      name: 'danger button',
      context: {
        status: 'danger',
        label: 'Label tekst',
        removable: true
      }
    },
    {
      name: 'danger compact',
      context: {
        status: 'danger',
        label: 'Label tekst',
        compact: true
      }
    },
    {
      name: 'default hover',
      context: {
        _ignore: true
      }
    },
    {
      name: 'default button hover',
      context: {
        status: 'default',
        label: 'Hover',
        removable: true,
        hover: true
      }
    }
  ]
};
