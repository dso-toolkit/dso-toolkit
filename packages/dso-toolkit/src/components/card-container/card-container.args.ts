import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";
import { CardArgs, cardArgsMapper } from "../card/card.args.js";

import { CardContainer, CardContainerMode } from "./card-container.models.js";

export interface CardContainerArgs {
  mode: CardContainerMode;
  cards: CardArgs[];
}

export const cardContainerArgTypes: ArgTypes<CardContainerArgs> = {
  mode: {
    options: ["list", "grid"],
    control: {
      type: "select",
    },
  },
  cards: {
    ...noControl,
  },
};

export const cardContainerArgs: Omit<CardContainerArgs, "mode"> = {
  cards: [
    {
      label: "Begrippen uit de Omgevingswet",
      href: "#",
      active: false,
      selectable: true,
      interactions: [],
      dsoCardClick() {},
    },
    {
      label: "Activiteiten",
      href: "#",
      active: false,
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
      selectable: false,
      dsoCardClick() {},
    },
    {
      label: "Werkzaamheden",
      href: "#",
      active: false,
      selectable: false,
      interactions: [],
      dsoCardClick() {},
    },
    {
      label: "Waardelijsten",
      href: "#",
      active: false,
      selectable: false,
      interactions: [],
      dsoCardClick() {},
    },
    {
      label: "Bronnen",
      href: "#",
      active: false,
      selectable: false,
      interactions: [],
      dsoCardClick() {},
    },
    {
      label: "Informatieproducten",
      href: "#",
      active: false,
      selectable: false,
      interactions: [],
      dsoCardClick() {},
    },
  ],
};

export function cardContainerArgsMapper<TemplateFnReturnType>(
  a: CardContainerArgs,
  content: TemplateFnReturnType[],
): CardContainer<TemplateFnReturnType> {
  return {
    ...a,
    cards: a.cards.map((card, index) => {
      const c = content[index];
      if (!c) {
        throw new Error("No content found for index");
      }

      return cardArgsMapper(card, c);
    }),
  };
}
