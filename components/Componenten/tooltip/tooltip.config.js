module.exports = {
  notes: `
* \`.fade\` en \`.in\` zijn standaard Bootstrap classes die betrekking hebben op animatie en het al dan niet tonen van componenten.
* Positionering van de tooltip moet via scripting worden gedaan. Bijvoorbeeld het tooltip component van \`react-bootstrap\` biedt hier standaard ondersteuning voor.
  Zie: https://react-bootstrap.github.io/components/overlays/#tooltips
  `,
  collated: true,
  collator: (markup, item) => `<div style="position: relative; height: 4em;">${markup}</div>`,
  status: 'inprogress',
  context: {
    label: 'Hergebruiken',
    position: 'top'
  },
  variants: [
    {
      name: 'tooltip-long-text',
      context: {
        label: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
      }
    },
    {
      name: 'tooltip-left',
      context: {
        label: 'Ik sta links van de content.',
        position: 'left'
      }
    },
    {
      name: 'tooltip-right',
      context: {
        label: 'Ik sta rechts van de content.',
        position: 'right'
      }
    },
    {
      name: 'tooltip-bottom',
      context: {
        label: 'Ik sta onder de content.',
        position: 'bottom'
      }
    }
  ]
}

// module.exports = {
//   variants: [
//   ]
// };
