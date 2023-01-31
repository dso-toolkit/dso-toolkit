import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook/index.js";
import { Card } from "./card.models.js";

export interface CardArgs {
  label: string;
  selectable: boolean;
  interactions: unknown[];
  image: string | undefined;
  dsoCardClicked: HandlerFunction;
}

export const cardArgTypes: ArgTypes<CardArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  selectable: {
    ...noControl,
  },
  interactions: {
    ...noControl,
  },
  image: {
    ...noControl,
  },
  dsoCardClicked: {
    ...noControl,
    action: "dsoCardClicked",
  },
};

export function cardArgsMapper<TemplateFnReturnType>(
  a: CardArgs,
  content: TemplateFnReturnType
): Card<TemplateFnReturnType> {
  return {
    ...a,
    selectable: a.selectable
      ? {
          id: "1",
          label: "Selecteer",
          type: "checkbox",
          value: "1",
          slot: "selectable",
        }
      : undefined,
    content,
    dsoCardClicked: (e) => a.dsoCardClicked(e.detail),
  };
}
