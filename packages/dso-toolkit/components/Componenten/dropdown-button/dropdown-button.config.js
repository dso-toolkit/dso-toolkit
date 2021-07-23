module.exports = {
  notes: `
  **Implementatie:**

  Het openen en sluiten van de dropdown button moet worden ondersteund met muis-, touch- en toetsenbordbediening.

  De scripting zal zelf geïmplementeerd moeten worden, waarbij het te programmeren gedrag op de diverse relevante toetsen gelijk moet zijn aan de native browser dropdown/select werkvorm:

  * \`event.code\` \`ArrowUp\` : omhoog, vorige 'option', zelfde als tab
  * \`event.code\` \`ArrowDown\` : omlaag, volgende 'option', zelfde als shift-tab
  * \`event.code\` \`Escape\` : sluit dropdown, geen keuze maken
  * \`event.code\` \`Space\` : maak keuze

  `,
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
    open: false,
    label: 'Actie'
  },
  variants: [
    {
      name: 'dropdown-link-open',
      context: {
        id: 'dropdown-link-open',
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
      name: 'dropdown-link-open-selectable',
      context: {
        id: 'dropdown-link-open-selectable',
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
    },
    {
      name: 'dropdown-default-button',
      context: {
        id: 'dropdown_default_button',
        modifier: 'default',
        open: false
      }
    },
    {
      name: 'dropdown-default-button-open',
      context: {
        id: 'dropdown_default_button_open',
        modifier: 'default',
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
      name: 'dropdown-default-button-open-checkable',
      context: {
        id: 'dropdown_default_button_open_checkable',
        modifier: 'default',
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
    },
    {
      name: 'dropdown-primary-button',
      context: {
        id: 'dropdown_primary_button',
        modifier: 'primary',
        open: false
      }
    },
    {
      name: 'dropdown-primary-button-open',
      context: {
        id: 'dropdown_primary_button_open',
        modifier: 'primary',
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
      name: 'dropdown-primary-button-open-checkable',
      context: {
        id: 'dropdown_primary_button_open_checkable',
        modifier: 'primary',
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
    },
    {
      name: 'dropdown-link-button-align-right',
      context: {
        id: 'dropdown_link_button_align_right',
        modifier: 'link',
        open: true,
        align: 'right',
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
    },
    {
      name: 'dropdown-default-button-align-right',
      context: {
        id: 'dropdown_default_button_align_right',
        modifier: 'default',
        open: true,
        align: 'right',
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
    },
    {
      name: 'dropdown-primary-button-align-right',
      context: {
        id: 'dropdown_primary_button_align_right',
        modifier: 'primary',
        open: true,
        align: 'right',
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
