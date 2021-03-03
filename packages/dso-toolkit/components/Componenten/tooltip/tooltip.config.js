module.exports = {
  label: 'Tooltip (Web Component)',
  meta: {
    webComponent: 'dso-tooltip'
  },
  notes: `
Een tooltip hoort bij een \`target\` element. Dit kan aangegeven worden met het attribuut \`for\`. Dit kan een \`string\` zijn met een id of een \`HTMLElement\`. Zonder \`target\` wordt de parent van \`<dso-tooltip>\` gebruikt.

Scriptend de tooltip tonen/verbergen kan met de instance methods \`activate()\` en \`deactivate()\` of met het het attribuut \`active\`.

Het positioneren van de tooltip wordt met [Popper](https://popper.js.org/) gedaan.
  `,
  collated: true,
  collator: (markup, item) => `<div style="position: relative; height: 4em;">${markup}</div>`,
  context: {
    label: 'Boven',
    position: 'top'
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
        label: 'Ik sta rechts van de inhoud',
        position: 'right'
      }
    },
    {
      name: 'tooltip-bottom',
      context: {
        label: 'Ik sta onder de inhoud',
        position: 'bottom'
      }
    }
  ]
}
