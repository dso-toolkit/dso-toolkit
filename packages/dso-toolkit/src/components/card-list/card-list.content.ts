import { Card } from "../card/card.models";

export const cardListContent: { cards: Card<unknown>[] } = {
  cards: [
    {
      label: "Omgevingsplan Nieuwegein",
      selectable: {
        id: "omgevingsplan-nieuwegein",
        type: "checkbox",
        value: "omgevingsplan-nieuwegein",
      },
    },
    {
      label: "Brouwersmolen",
    },
    {
      label: "Maximum bouwhoogte",
      image: "images/rectangle1.png",
    },
  ],
};
