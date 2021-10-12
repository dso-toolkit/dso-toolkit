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
        label: 'Label (standaard)'
      }
    },
    {
      name: 'default button',
      context: {
        label: 'Label (standaard)',
        removable: true
      }
    },
    {
      name: 'default compact',
      context: {
        label: 'Label (standaard)',
        compact: true
      }
    },
    {
      name: 'info',
      context: {
        status: 'info',
        label: 'Label (info)'
      }
    },
    {
      name: 'info button',
      context: {
        status: 'info',
        label: 'Label (info)',
        removable: true
      }
    },
    {
      name: 'info compact',
      context: {
        status: 'info',
        label: 'Label (info)',
        compact: true
      }
    },
    {
      name: 'primary',
      context: {
        status: 'primary',
        label: 'Label (primair)'
      }
    },
    {
      name: 'primary button',
      context: {
        status: 'primary',
        label: 'Label (primair)',
        removable: true
      }
    },
    {
      name: 'primary compact',
      context: {
        status: 'primary',
        label: 'Label (primair)',
        compact: true
      }
    },
    {
      name: 'success',
      context: {
        status: 'success',
        label: 'Label (succes)'
      }
    },
    {
      name: 'success button',
      context: {
        status: 'success',
        label: 'Label (succes)',
        removable: true
      }
    },
    {
      name: 'success compact',
      context: {
        status: 'success',
        label: 'Label (succes)',
        compact: true
      }
    },
    {
      name: 'warning',
      context: {
        status: 'warning',
        label: 'Label (waarschuwing)'
      }
    },
    {
      name: 'warning button',
      context: {
        status: 'warning',
        label: 'Label (waarschuwing)',
        removable: true
      }
    },
    {
      name: 'warning compact',
      context: {
        status: 'warning',
        label: 'Label (waarschuwing)',
        compact: true
      }
    },
    {
      name: 'danger',
      context: {
        status: 'danger',
        label: 'Label (gevaar)'
      }
    },
    {
      name: 'danger button',
      context: {
        status: 'danger',
        label: 'Label (gevaar)',
        removable: true
      }
    },
    {
      name: 'danger compact',
      context: {
        status: 'danger',
        label: 'Label (gevaar)',
        compact: true
      }
    },
    {
      name: 'bright',
      context: {
        status: 'bright',
        label: 'Label (helder)'
      }
    },
    {
      name: 'bright button',
      context: {
        status: 'bright',
        label: 'Label (helder)',
        removable: true
      }
    },
    {
      name: 'bright compact',
      context: {
        status: 'bright',
        label: 'Label (helder)',
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
