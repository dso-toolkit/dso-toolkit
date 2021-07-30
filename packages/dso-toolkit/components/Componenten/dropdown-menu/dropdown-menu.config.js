module.exports = {
  meta: {
    webComponent: 'dso-dropdown-menu',
    markup: true
  },
  notes: `
  ## Voorschriften/algemeen

  * \`<dso-dropdown-menu>\` is de root van het component, dat bestaat uit een  \`button\` en het daadwerkelijke menu, de \`.dso-dropdown-options\`;
  * \`button\` heeft attribute \`aria-haspopup="true"\` om aan te duiden dat deze een menu bedient, en moet een \`id\` hebben waarnaar verwezen wordt vanuit de \`<ul>\`s in de optielijst met een \`aria-labelledby\`-attribuut;
  * \`button\` heeft attribute \`slot="toggle"\`, zodat het Web Component 'weet' dat dit de bedieningsknop is;
  `,
  label: 'Dropdown Menu (Web Component)',
  status: 'ready',
  collated: true,
  collator: function (markup, item) {
    return `<div class="col-md-4 col-sm-6 col-xs-12">${markup}</div>`;
  },
  default: 'dropdown-link',
  context: {
    id: 'actie',
    modifier: 'link',
    ariaHasPopup: true,
    label: 'Actie',
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
      }
    ]
  },
  variants: [
    {
      name: 'dropdown-default-button-open-checkable',
      context: {
        id: 'dropdown_default_button_open_checkable',
        modifier: 'default',
        modifiers: 'dso-checkable',
        isCheckable: true,
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
          }
        ]
      }
    },
    {
      name: 'dropdown-primary-button-open-checkable',
      context: {
        id: 'dropdown_primary_button_open_checkable',
        modifier: 'primary',
        modifiers: 'dso-checkable',
        isCheckable: true,
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
          }
        ]
      }
    },
    {
      name: 'dropdown-link-button-align-right',
      context: {
        id: 'dropdown_link_button_align_right',
        modifier: 'link',
        align: 'right',
        modifiers: 'dso-checkable',
        isCheckable: true,
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
          }
        ]
      }
    },
    {
      name: 'dropdown-default-button-align-right',
      context: {
        id: 'dropdown_default_button_align_right',
        modifier: 'default',
        align: 'right',
        modifiers: 'dso-checkable',
        isCheckable: true,
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
          }
        ]
      }
    },
    {
      name: 'dropdown-primary-button-align-right',
      context: {
        id: 'dropdown_primary_button_align_right',
        modifier: 'primary',
        align: 'right',
        modifiers: 'dso-checkable',
        isCheckable: true,
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
          }
        ]
      }
    }
  ]
};
