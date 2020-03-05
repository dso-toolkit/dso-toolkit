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
    open: false,
    label: 'Actie'
  },
  variants: [
    {
      name: 'dropdown-open',
      context: {
        id: 'actie_open',
        open: true,
        items: [
          {
            group: [
              {
                label: "Actie"
              },
              {
                label: "Andere actie"
              },
              {
                label: "Nog iets anders hier"
              }
            ]
          },
          {
            group: [
              {
                "label": "Gescheiden link"
              }
            ]
          }
        ]
      }
    },
    {
      name: 'dropdown-open-check',
      context: {
        id: 'actie_open_checkable',
        open: true,
        modifiers: 'dso-checkable',
        items: [
          {
            group: [
              {
                label: "Actie",
                checked: true
              },
              {
                label: "Andere actie"
              },
              {
                label: "Nog iets anders hier"
              }
            ]
          },
          {
            group: [
              {
                label: "Gescheiden link"
              }
            ]
          }
        ]
      }
    }
  ]
};
