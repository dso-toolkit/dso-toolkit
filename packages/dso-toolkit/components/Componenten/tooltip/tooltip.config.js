module.exports = {
  label: 'Tooltip (Web Component)',
  meta: {
    webComponent: 'dso-tooltip'
  },
  collated: true,
  collator: (markup, item) => `<div style="position: relative; height: 4em;">${markup}</div>`,
  context: {
    label: 'Boven',
    position: 'top',
    small: false
  },
  variants: [
    {
      name: 'tooltip-left',
      context: {
        label: 'Ik sta links van de inhoud',
        position: 'left'
      }
    },
    {
      name: 'tooltip-right',
      context: {
        label: 'Uw verzoek is ingediend. Meestal krijgt u binnen acht weken het besluit van de behandelende organisatie.',
        position: 'right'
      }
    },
    {
      name: 'tooltip-bottom',
      context: {
        label: 'Ik sta onder de inhoud',
        position: 'bottom'
      }
    },
    {
      name: 'tooltip-right-small',
      context: {
        label: 'Uw verzoek is ingediend. Meestal krijgt u binnen acht weken het besluit van de behandelende organisatie.',
        position: 'right',
        small: true
      }
    }
  ]
};
