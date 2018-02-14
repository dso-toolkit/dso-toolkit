module.exports = {
  notes: `Gedrag typeahead component:
* Tijdens het typen wordt de typeahead geopend
* De matchende teksten worden gewrapped in een \`<span class="match">\`
* Sorteren op meest-relevant naar minst-relevant dmv. matching score
* De typeahead wordt gesloten zodra er een waarde wordt geselecteerd (dmv. klik of keyboard)
* De typeahead wordt gesloten zodra er buiten de typeahead wordt geklikt
`,
  status: 'wip',
  default: 'closed',
  collated: true,
  collator: (markup, item) => `<div class="col-md-4"><h2>${item.label}</h2><hr />${markup}</div>`,
  context: {
    ariaLabel: 'Doel vergunning',
    icon: 'fa fa-search',
    modifier: 'primary',
    placeholder: 'Doel vergunning',
    iconOnly: true,
    label: 'Zoek'
  },
  variants: [
    {
      name: 'open',
      context: {
        value: 'een',
        open: true
      }
    },
    {
      name: 'no-results',
      context: {
        value: 'twee',
        noResults: true
      }
    }
  ]
};
