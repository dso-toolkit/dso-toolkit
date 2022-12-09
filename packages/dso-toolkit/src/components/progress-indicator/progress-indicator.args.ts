import { ArgTypes } from "../../storybook/index.js";

import { ProgressIndicator } from "./progress-indicator.models.js";

export interface ProgressIndicatorArgs {
  label: string;
  size: "small" | "medium" | "large";
  block: boolean;
}

export const progressIndicatorArgTypes: ArgTypes<ProgressIndicatorArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  size: {
    options: [undefined, "small", "medium", "large"],
    control: {
      type: "select",
    },
  },
  block: {
    control: {
      type: "boolean",
    },
  },
};

export function progressIndicatorArgsMapper(a: ProgressIndicatorArgs): ProgressIndicator {
  return {
    label: a.label || undefined,
    size: a.size,
    block: a.block,
  };
}
