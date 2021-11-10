module.exports = {
  label: "Toggletip (Web Component)",
  meta: {
    webComponent: "dso-toggletip",
  },
  notes: `
  Toggletips geven aanvullende informatie in de gebruikersinterface. Ze lijken erg op tooltips, behalve dat de tip niet wordt weergegeven bij hover of focus. Een toggletip is gekoppeld aan een trigger (info button) en maakt gebruik van ‘Rich Content’ om tekst te structureren en interactieve elementen te plaatsen.

  ## Technische opmerkingen component
  - Het is op dit moment alleen mogelijk een toggletip te gebruiken icm een info button.
  - De positionering van de toggletip is, net als bij tooltips, instelbaar.

  ## Wanneer het component gebruiken
  Gebruik een toggletip om extra informatie te bieden, zonder dat de gebruiker direct de context van de pagina verliest. Voorwaarde is dat de gebruiker niet naar de informatie hoeft te handelen.

  De inhoud van een toggletip is conceptueel vaak gelijk aan voetnoten op een pagina. Interactieve elementen zoals links zijn OK.

  ## Wanneer het component niet te gebruiken
  Een toggletip is dus niet bedoeld als vervanging voor een tooltip met één woord of term ter verduidelijking van een actie. Plaats geen cruciale informatie of lange teksten in een toggletip. Overweeg om voor langere inhoud een modal te gebruiken.

  En beter nog; als je de ruimte hebt gebruik dan géén tooltips of toggletips, maar duidelijke labels en vaste content op de pagina.

  ## Hoe het component te gebruiken
  Een toggletip is een samengesteld patroon met een info button en een overlay (tooltip). De info button schakelt de zichtbaarheid van de overlay in en uit.

  ## Gedrag en toegankelijkheid van het component
  De trigger bevat altijd een toegankelijk label; als deze niet is gedefinieerd bij de toggletip wordt de default "Toelichting".

  ## Voorbeelden
  - Stelselcatalogus > Begrip
  - Mijn Omgevingsloket > Project
  `,
  context: {
    label: "Rechts met platte content",
    text: "Dit is een toggletip met platte content.",
  },
  variants: [
    {
      name: "interactieve-content",
      context: {
        label: "Rechts met interactieve content",
        text: `Dit is een toggletip met <a href="#">interactieve content</a>.`,
      },
    },
    {
      name: "left",
      context: {
        label: "Links met interactieve content",
        text: `Dit is een toggletip met <a href="#">interactieve content</a>.`,
        position: "left",
      },
    },
    {
      name: "bottom",
      context: {
        label: "Onder met interactieve content",
        text: `Dit is een toggletip met <a href="#">interactieve content</a>.`,
        position: "bottom",
      },
    },
    {
      name: "top",
      context: {
        label: "Boven met interactieve content",
        text: `Dit is een toggletip met <a href="#">interactieve content</a>.`,
        position: "top",
      },
    },
    {
      name: "not-small",
      context: {
        label: "Rechts met veel tekst",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere aliquam leo vitae gravida.
              Nullam gravida tellus sed varius dictum. Donec a risus at leo tincidunt laoreet.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Nunc convallis magna in lacus rhoncus, in lacinia libero sagittis. Vivamus eu ante erat.
              Vivamus tincidunt id mi et sollicitudin. Sed varius gravida dictum.`,
      },
    },
    {
      name: "small",
      context: {
        label: "Rechts met veel tekst smal",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere aliquam leo vitae gravida.
              Nullam gravida tellus sed varius dictum. Donec a risus at leo tincidunt laoreet.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Nunc convallis magna in lacus rhoncus, in lacinia libero sagittis. Vivamus eu ante erat.
              Vivamus tincidunt id mi et sollicitudin. Sed varius gravida dictum.`,
        small: true,
      },
    },
  ],
};
