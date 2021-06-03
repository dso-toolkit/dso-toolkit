module.exports = {
  label: 'Tooltip (CSS Component)',
  notes: `
* \`.fade\` en \`.in\` zijn standaard Bootstrap classes die betrekking hebben op animatie en het al dan niet tonen van componenten.
* Positionering van de tooltip moet via scripting worden gedaan. Bijvoorbeeld het tooltip component van \`react-bootstrap\` biedt hier standaard ondersteuning voor.
  Zie: https://react-bootstrap.github.io/components/overlays/#tooltips
  `,
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
