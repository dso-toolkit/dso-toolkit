import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { SegmentedButton } from "./segmented-button.models.js";

export interface SegmentedButtonArgs {
  options: SegmentedButton["options"];
  activeOption?: number;
  dsoChange: HandlerFunction;
  segmentedAriaRequired?: boolean;
  segmentedAriaLabel?: string;
}

export const segmentedButtonArgs: SegmentedButtonArgs = {
  options: [
    { label: "Button 1", disabled: false },
    { label: "Button 2", disabled: true },
    { label: "Button 3", disabled: false },
    { label: "Button 4", disabled: false },
  ],
  dsoChange: fn(),
};

export const segmentedButtonArgTypes: ArgTypes<SegmentedButtonArgs> = {
  options: {
    control: {
      type: "object",
    },
  },
  activeOption: {
    control: {
      type: "select",
      options: [undefined, 0, 1, 2, 3, 4],
      labels: {
        undefined: "Geen selectie",
        0: "Button 1",
        1: "Button 2",
        2: "Button 3",
        3: "Button 4",
      },
    },
  },
  dsoChange: argTypeAction(),
  segmentedAriaRequired: {
    control: {
      type: "boolean",
    },
  },
  segmentedAriaLabel: {
    control: {
      type: "text",
    },
  },
};

export function segmentedButtonArgsMapper(a: SegmentedButtonArgs): SegmentedButton {
  return {
    ...a,
    dsoChange: (event) => {
      a.dsoChange(event.detail);
    },
  };
}
