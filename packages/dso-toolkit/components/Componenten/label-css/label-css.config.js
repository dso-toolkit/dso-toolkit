const symbolImage = '<span class="symboolcode" data-symboolcode="vag000"></span>';
const symbolColor = '<span class="symboolcode" data-symboolcode="vszt030"></span>';

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
        label: 'Label (fout)'
      }
    },
    {
      name: 'danger button',
      context: {
        status: 'danger',
        label: 'Label (fout)',
        removable: true
      }
    },
    {
      name: 'danger compact',
      context: {
        status: 'danger',
        label: 'Label (fout)',
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
      name: 'bright symbol image',
      context: {
        status: 'bright',
        label: 'Met symbool (image)',
        symbol: symbolImage
      }
    },
    {
      name: 'bright button symbol image',
      context: {
        status: 'bright',
        label: 'Met symbool (image)',
        removable: true,
        symbol: symbolImage
      }
    },
    {
      name: 'bright compact symbol image',
      context: {
        status: 'bright',
        label: 'Met symbool (image)',
        compact: true,
        symbol: symbolImage
      }
    },
    {
      name: 'bright symbol color',
      context: {
        status: 'bright',
        label: 'Met symbool (color)',
        symbol: symbolColor
      }
    },
    {
      name: 'bright button symbol color',
      context: {
        status: 'bright',
        label: 'Met symbool (color)',
        removable: true,
        symbol: symbolColor
      }
    },
    {
      name: 'bright compact symbol color',
      context: {
        status: 'bright',
        label: 'Met symbool (color)',
        compact: true,
        symbol: symbolColor
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
