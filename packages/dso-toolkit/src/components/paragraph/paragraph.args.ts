import { ArgTypes } from "@storybook/types";
import { noControl } from "../../storybook";

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
  content: {
    ...noControl,
  },
};

export function paragraphArgsMapper(p: ParagraphArgs, content: string): Paragraph {
  return {
    ...p,
    content,
    variant: p.variant,
  };
}
