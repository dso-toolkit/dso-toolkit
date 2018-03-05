module.exports = {
  notes: `Plaatst een lichtgewicht, flexibel component dat optioneel de gehele breedte van de viewport kan bevatten om belangrijke content van je site te tonen. Gebaseerd op Bootstrap "Jumbotron".`,
  status: "ready",
  collated: true,
  collator: function (markup, item) {
    return `<div class="row${item.context._rowModifier ? ` ${item.context._rowModifier}` : ''}">
              <div class="col-xs-12">
                <p><i>${item.context._exampleLabel}</i></p>
                ${markup}
              </div>
            </div>`;
  },
  context: {
    _exampleLabel: 'Jumbotron',
    title: "Aan de slag met de Omgevingswet",
    content: `Data en services van het digitaal stelsel Omgevingswet zijn in ontwikkeling en worden gedurende het project via het Ontwikkelaarsportaal ter beschikking gesteld voor derden. De datasets op dit platform zijn benaderbaar vie RESTfull API's. In onze API store zijn de volgende services in beta versie beschikbaar.`
  },
  variants: [
    {
      name: "button",
      context: {
        _rowModifier: 'full-width',
        _exampleLabel: 'Jumbotron met Button',
        button: {
          label: "Aan de slag",
          type: "button",
          modifier: "link",
          state: "standard",
          icon: "icon fa fa-angle-right"
        }
      }
    },
    {
      name: "image",
      context: {
        _exampleLabel: 'Jumbotron met Image',
        image: {
          source: "/dummy/images/avatar.png",
          alt: "Alternatieve tekst"
        }
      }
    },
    {
      name: "image-button",
      context: {
        _exampleLabel: 'Jumbotron met Button en Image',
        image: {
          source: "/dummy/images/avatar.png",
          alt: "Alternatieve tekst"
        },
        button: {
          label: "Aan de slag",
          type: "button",
          modifier: "link",
          state: "standard",
          icon: "icon fa fa-angle-right"
        }
      }
    }
  ]
};
