export const cardContainerContent = {
  cards: [
    {
      label: "Begrippen uit de Omgevingswet",
      selectable: true,
    },
    {
      label: "Activiteiten",
      selectable: false,
      interactions: [
        {
          type: "button",
          variant: "tertiary",
          label: "Toon informatie",
          icon: {
            icon: "info",
          },
        },
      ],
    },
    {
      label: "Werkzaamheden",
      selectable: false,
      image: "images/rectangle1.png",
    },
    {
      label: "Waardelijsten",
      selectable: false,
    },
    {
      label: "Bronnen",
      selectable: false,
    },
    {
      label: "Informatieproducten",
      selectable: false,
    },
  ],
};
