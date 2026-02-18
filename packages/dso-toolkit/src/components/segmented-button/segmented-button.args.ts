import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { SegmentedButton } from "./segmented-button.models.js";

export interface SegmentedButtonArgs {
  options: SegmentedButton["options"];
  activeOption: number;
  dsoChange: HandlerFunction;
}

export const segmentedButtonArgs: SegmentedButtonArgs = {
  options: [
    { label: "Button 1", disabled: false },
    { label: "Button 2", disabled: true },
    { label: "Button 3", disabled: false },
    { label: "Button 4", disabled: false },
  ],
  activeOption: -1,
  dsoChange: () => undefined,
};

export const segmentedButtonArgTypes: ArgTypes<SegmentedButtonArgs> = {
  options: {
    control: {
      type: "object",
    },
  },
  activeOption: {
    control: {
      type: "number",
    },
  },
  dsoChange: argTypeAction(),
};

export function segmentedButtonArgsMapper(a: SegmentedButtonArgs): SegmentedButton {
  return {
    ...a,
    dsoChange: (event) => {
      a.dsoChange(event.detail);
    },
  };
}
