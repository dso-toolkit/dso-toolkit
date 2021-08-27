module.exports = {
  notes: `
  ## Implementatie

  Het openen en sluiten van de dropdown button moet worden ondersteund met muis-, touch- en toetsenbordbediening.
  De scripting zal zelf geïmplementeerd moeten worden, waarbij het te programmeren gedrag op de diverse relevante toetsen gelijk moet zijn aan de native browser dropdown/select werkvorm (en het Web Component). Inspiratie: [Bootstrap dropdown](https://github.com/twbs/bootstrap/blob/main/js/src/dropdown.js#L450)

  * \`event.code\` \`ArrowUp\` : omhoog, vorige 'option', zelfde als tab
  * \`event.code\` \`ArrowDown\` : omlaag, volgende 'option', zelfde als shift-tab
  * \`event.code\` \`Escape\` : sluit dropdown, geen keuze maken
  * \`event.code\` \`Space\` : maak keuze

  ## Voorschriften/algemeen

  * \`.dso-dropdown-menu\` is de root van het component, dat bestaat uit een \`button\` en het daadwerkelijke menu, de \`.dso-dropdown-options\`;
  * \`.dso-dropdown-options\` heeft \`role="menu"\` en verwijst met \`aria-labelledby\` naar de \`button\`;
  * \`.dso-dropdown-options\` wordt getoond wanneer \`.dso-dropdown-menu\` de class \`dso-open\` heeft;
  * de links in het menu krijgen \`role="menuitemradio"\` en het geselecteerde item \`aria-checked="true"\`;
  * \`button\` heeft attribute \`aria-haspopup="menu"\` om aan te duiden dat deze een menu bedient, en moet een \`id\` hebben waarnaar verwezen wordt vanuit \`.dso-dropdown-options\` met een \`aria-labelledby\`-attribuut

  ### Menu ingeklapt

  * \`.dso-dropdown-menu\` geen class \`dso-open\`
  * \`button\` attribute \`aria-expanded="false"\`

  \`\`\`
  <div class="dso-dropdown-menu">
    <button type="button" aria-haspopup="true" aria-expanded="false" class="dso-tertiary">
    <div class="dso-dropdown-options" ... > ...
  </div>
  \`\`\`

  ## Menu uitgeklapt

  * \`div.dropdown\` heeft class \`dso-open\`
  * \`button\` attribute \`aria-expanded="true"\`

  \`\`\`
  <div class="dso-dropdown-menu dso-open">
    <button type="button" aria-haspopup="true" aria-expanded="true" class="dso-tertiary">
    <div class="dso-dropdown-options" ... > ...
  </div>
  \`\`\`

  Note: de \`button\` mag class \`dso-primary\`, \`dso-secondary\` of \`dso-tertiary\` hebben, afhankelijk van de toepassing. Ook de oude bootstrap classes \`btn\`, \`btn-default\`, \`btn-link\` worden nog ondersteund.
  `,
  label: 'Dropdown Menu (CSS Component)',
  status: 'ready',
  collated: true,
  collator: function (markup, item) {
    return `<div class="col-md-4 col-sm-6 col-xs-12">${markup}</div>`;
  },
  default: 'dropdown-link',
  context: {
    id: 'actie',
    modifier: 'dso-tertiary',
    ariaHasPopup: 'menu',
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
        modifier: 'dso-secondary',
        open: false
      }
    },
    {
      name: 'dropdown-default-button-open',
      context: {
        id: 'dropdown_default_button_open',
        modifier: 'dso-secondary',
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
        modifier: 'dso-secondary',
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
        modifier: 'dso-primary',
        open: false
      }
    },
    {
      name: 'dropdown-primary-button-open',
      context: {
        id: 'dropdown_primary_button_open',
        modifier: 'dso-primary',
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
        modifier: 'dso-primary',
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
        modifier: 'dso-tertiary',
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
        modifier: 'dso-secondary',
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
        modifier: 'dso-primary',
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
