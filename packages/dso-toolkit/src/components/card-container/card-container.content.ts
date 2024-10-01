import { Card } from "../card/card.models";

export const cardContainerContent: { cards: Card<unknown>[] } = {
  cards: [
    {
      label: "Begrippen uit de Omgevingswet",
      href: "#",
      selectable: {
        id: "begrippen-uit-de-omgevingswet",
        type: "checkbox",
        value: "begrippen-uit-de-omgevingswet",
      },
    },
    {
      label: "Activiteiten",
      href: "#",
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
      href: "#",
    },
    {
      label: "Waardelijsten",
      href: "#",
    },
    {
      label: "Bronnen",
      href: "#",
    },
    {
      label: "Informatieproducten",
      href: "#",
    },
  ],
};
