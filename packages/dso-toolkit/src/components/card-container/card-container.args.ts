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
