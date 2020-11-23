module.exports = {
  notes: 'Toont een dropdown met daarin een gevulde uitklapper. Gebaseerd op de Bootstrap "Dropdowns" component',
  status: 'ready',
  collated: true,
  collator: function (markup, item) {
    return `<li>${markup}</li>`;
  },
  default: 'dropdown',
  context: {
    id: 'actie',
    modifier: 'default',
    open: false,
    label: 'Actie'
  },
  variants: [
    {
      name: 'dropdown-open',
      context: {
        id: 'actie_open',
        open: true,
        groups: [
          {
            label: 'Versies',
            items: [
              {
                label: '10.6.0'
              },
              {
                label: '10.5.0'
              },
              {
                label: '10.4.0'
              }
            ]
          },
          {
            items: [
              {
                label: 'master'
              }
            ]
          },
          {
            label: 'Branch releases',
            items: [
              {
                label: '#500-Margins-Testbuilds'
              },
              {
                label: '#611-Pager-component-uitbreiden'
              },
              {
                label: '#663-Dropdown-button-toegankelijk-maken'
              }
            ]
          },
        ]
      }
    },
    {
      name: 'dropdown-open-check',
      context: {
        id: 'actie_open_checkable',
        open: true,
        modifiers: 'dso-checkable',
        groups: [
          {
            label: 'Versies',
            items: [
              {
                label: '10.6.0',
                checked: true
              },
              {
                label: '10.5.0'
              },
              {
                label: '10.4.0'
              }
            ]
          },
          {
            items: [
              {
                label: 'master'
              }
            ]
          },
          {
            label: 'Branch releases',
            items: [
              {
                label: '#500-Margins-Testbuilds'
              },
              {
                label: '#611-Pager-component-uitbreiden'
              },
              {
                label: '#663-Dropdown-button-toegankelijk-maken'
              }
            ]
          },
        ]
      }
    }
  ]
};
