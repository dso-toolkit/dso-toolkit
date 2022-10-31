import { ArgTypes } from "../../storybook";

import { HighlightBox } from "./highlight-box.models";

export interface HighlightBoxArgs {
  yellow: boolean;
  white: boolean;
  dropShadow: boolean;
  border: boolean;
  step?: number;
  icon?: string;
}

export const highlightBoxArgTypes: ArgTypes<HighlightBoxArgs> = {
  yellow: {
    control: {
      type: "boolean",
    },
  },
  white: {
    control: {
      type: "boolean",
    },
  },
  dropShadow: {
    control: {
      type: "boolean",
    },
  },
  border: {
    control: {
      type: "boolean",
    },
  },
  step: {
    control: {
      type: "number",
      min: 0,
    },
  },
  icon: {
    control: {
      type: "select",
      options: [undefined, "plus", "table"],
    },
  },
};

export function highlightBoxArgsMapper<TemplateFnReturnType>(
  a: HighlightBoxArgs,
  richContent: TemplateFnReturnType
): HighlightBox<TemplateFnReturnType> {
  return {
    border: a.border,
    dropShadow: a.dropShadow,
    richContent,
    white: a.white,
    yellow: a.yellow,
    icon: a.icon,
    step: a.step,
  };
}
