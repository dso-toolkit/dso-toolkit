import { ArgTypes } from "@storybook/types";

import { HighlightBox } from "./highlight-box.models.js";

export interface HighlightBoxArgs {
  yellow: boolean;
  white: boolean;
  dropShadow: boolean;
  border: boolean;
  step?: number;
  icon?: string;
  bannerImage?: boolean;
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
  bannerImage: {
    control: {
      type: "boolean",
    },
  },
};

export function highlightBoxArgsMapper<TemplateFnReturnType>(
  a: HighlightBoxArgs,
  content: TemplateFnReturnType,
): HighlightBox<TemplateFnReturnType> {
  return {
    border: a.border,
    dropShadow: a.dropShadow,
    content,
    white: a.white,
    yellow: a.yellow,
    icon: a.icon,
    step: a.step,
    bannerImage: a.bannerImage,
  };
}
