import { ArgTypes } from "@storybook/types";
import { noControl } from "../../storybook";

import { Paragraph } from "./paragraph.models.js";

export interface ParagraphArgs {
  className?: string;
  content: string;
}

export const paragraphArgTypes: ArgTypes<ParagraphArgs> = {
  className: {
    options: [undefined, "dso-disclaimer"],
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
    className: p.className,
  };
}
