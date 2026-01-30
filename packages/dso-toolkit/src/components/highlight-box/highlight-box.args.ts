import { ArgTypes } from "storybook/internal/types";

import { HighlightBox } from "./highlight-box.models.js";

export interface HighlightBoxArgs {
  yellow: boolean;
  white: boolean;
  grey: boolean;
  green: boolean;
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
  green: {
    control: {
      type: "boolean",
    },
  },
  white: {
    control: {
      type: "boolean",
    },
  },
  grey: {
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
    options: [undefined, "plus", "table"],
    control: {
      type: "select",
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
    grey: a.grey,
    white: a.white,
    yellow: a.yellow,
    green: a.green,
    icon: a.icon,
    step: a.step,
    bannerImage: a.bannerImage,
  };
}
