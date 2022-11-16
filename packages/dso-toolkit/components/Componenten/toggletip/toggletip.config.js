module.exports = {
  label: "Toggletip (Web Component)",
  meta: {
    webComponent: "dso-toggletip",
  },
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
    {
      name: "secondary",
      context: {
        label: "Secundaire Toggletip",
        text: `Dit is een toggletip met <a href="#">interactieve content</a>.`,
        secondary: true,
      },
    },
  ],
};
