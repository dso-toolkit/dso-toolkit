const collator = require('../../../fractal/collator');

module.exports = {
  meta: {
    webComponent: 'dso-badge',
    markup: true
  },
  notes: `
  Een badge geeft de status aan van een systeem. Ook vestigt de badge aandacht op een numerieke waarde of markeert het een element. De badge valt onder de statusmeldingen.

  ## Wanneer te gebruiken
  Gebruik een badge om aandacht op een element te vestigen en/of om elementen van elkaar te onderscheiden. Ook kan een badge ingezet worden als teller: zodra de teller oploopt wordt de gebruiker visueel daarop gewezen. Een badge bevat een numerieke waarde om een lopende telling of samenvatting aan te geven.

  ## Hoe te gebruiken
  Gebruik badges in combinatie met tekst of een ander element om bijvoorbeeld als teller te werken. Gebruik ze dan alleen om een nummer weer te geven, eventueel met speciale tekens voor numerieke waarden zoals + en -. Een tellerbadge wordt niet gebruikt als de waarde 'nul' is, en is dan ook niet te zien.

  Een badge heeft geen interactie en is niet klikbaar of te verwijderen. Een badge bestaat uit een label en een achtergrond. Probeer de tekst zo kort mogelijk te houden. Zet er dus geen hele zinnen in. Alleen het eerste woord heeft een hoofdletter. Een badge label kan extra informatie bevatten, zoals een categorie of type badge.

  De achtergrond moet samenhangen met de tekst en kan gebruikt worden om een status te benadrukken, te informeren of de status in verband te brengen met informatie.

  ## Gedrag en toegankelijkheid
  * Gebruikers met een visuele beperking (waaronder kleurenblindheid) zien de kleur van de badge mogelijk niet (goed). Daarom mag de kleur niet van belang zijn om de informatie te begrijpen. Zorg dat de tekst in de badge ook los van de achtergrondkleur volkomen duidelijk is en alle informatie overbrengt. Je kunt in plaats van een 'zichtbaar tekstalternatief' ook een icoontje gebruiken, maar let er dan wel op dat je indien nodig een sr-only tekstalternatief geeft.


  ## Component in context
  - [Zoeken-in-lijst-cards]({{ '/components/detail/zoeken-in-lijst-cards' | docPath }})


  ## Bronvermelding
  - GOV.UK HMRC Assets Frontend components and patterns. Notification Badge. Geraadpleegd juli 2020, van http://hmrc.github.io/assets-frontend/components/notification-badge/index.html
  - Atlassian Design System. Badge. Geraadpleegd juli 2020, van
  https://www.atlassian.design/components/badge/examples
  - Siemens Design System. Geraadpleegd juli 2020, van https://design.mindsphere.io/patterns/badge.html
  `,
  status: 'ready',
  collated: true,
  collator: collator.inlineCollator,
  context: {
    label: 'Badge tekst'
  },
  variants: [
    {
      name: 'badge-info',
      context: {
        status: 'info'
      }
    },
    {
      name: 'badge-primary',
      context: {
        status: 'primary'
      }
    },
    {
      name: 'badge-success',
      context: {
        status: 'success'
      }
    },
    {
      name: 'badge-warning',
      context: {
        status: 'warning'
      }
    },
    {
      name: 'badge-danger',
      context: {
        status: 'danger'
      }
    },
    {
      name: 'badge-outline',
      context: {
        status: 'outline'
      }
    }
  ]
};
