import { ArgTypes } from "../../storybook";

import { ProgressBar } from "./progress-bar.models";

export interface ProgressBarArgs {
  progress: number;
  label?: string;
  min?: number;
  max?: number;
}

export const progressBarArgTypes: ArgTypes<ProgressBarArgs> = {
  min: {
    control: {
      type: "number",
    },
  },
  max: {
    control: {
      type: "number",
    },
  },
  progress: {
    control: {
      type: "number",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
};

export function progressBarArgsMapper(a: ProgressBarArgs): ProgressBar {
  return {
    progress: a.progress,
    label: a.label || undefined,
    max: a.max,
    min: a.min,
  };
}
