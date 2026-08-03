import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Paragraph } from "./paragraph.models.js";

export interface ParagraphArgs {
  variant?: "disclaimer";
  content: string;
}

export const paragraphArgTypes: ArgTypes<ParagraphArgs> = {
  variant: {
    options: [undefined, "disclaimer"],
    control: {
      type: "select",
    },
  },
  content: argTypeAction(),
};

export function paragraphArgsMapper(p: ParagraphArgs, content: string): Paragraph {
  return {
    ...p,
    content,
    variant: p.variant,
  };
}
