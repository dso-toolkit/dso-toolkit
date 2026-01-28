import { ArgTypes } from "storybook/internal/types";

import { HighlightBox, HighlightBoxColor } from "./highlight-box.models.js";

export interface HighlightBoxArgs {
  color: HighlightBoxColor;
  dropShadow: boolean;
  border: boolean;
  step?: number;
  icon?: string;
  bannerImage?: boolean;
}

export const highlightBoxArgTypes: ArgTypes<HighlightBoxArgs> = {
  color: {
    options: Object.values(HighlightBoxColor),
    control: { type: "select" },
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
    color: a.color,
    icon: a.icon,
    step: a.step,
    bannerImage: a.bannerImage,
  };
}
