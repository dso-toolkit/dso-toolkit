import { CardList } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

export const cardList: CardList<TemplateResult> = {
  cards: [
    {
      label: "Omgevingsplan industrieterrein Lange Voorden",
      content: html`Gemeente Nieuwegein lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      interactions: [
        {
          type: "button",
          variant: "tertiary",
          icon: { icon: "info" },
          label: "Extra informatie",
          iconMode: "only",
        },
      ],
    },
    {
      label: "Omgevingsplan Gemeente Den Haag",
      content: html`Brouwersmolen eget iaculis nisi quam in libero.`,
      interactions: [
        {
          type: "button",
          variant: "tertiary",
          icon: { icon: "info" },
          label: "Extra informatie",
          iconMode: "only",
        },
      ],
    },
    {
      label: "Flora en Fauna beslissing 2019",
      content: html`Brouwersmolen eget iaculis nisi quam in libero.`,
      interactions: [
        {
          type: "button",
          variant: "tertiary",
          icon: { icon: "info" },
          label: "Extra informatie",
          iconMode: "only",
        },
      ],
    },
    {
      label: "Bestemmingsplan Zuiderpark",
      content: html`Zuiderpark eget iaculis nisi quam in libero.`,
      interactions: [
        {
          type: "button",
          variant: "tertiary",
          icon: { icon: "info" },
          label: "Extra informatie",
          iconMode: "only",
        },
      ],
    },
  ],
};
