import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { InputRange, InputRangeChangeEvent } from "./input-range.models.js";

export interface InputRangeArgs {
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
  description: string;
  dsoChange: (e: InputRangeChangeEvent) => void;
}

export const inputRangeArgs: Omit<InputRangeArgs, "value" | "min" | "max" | "step"> = {
  unit: "%",
  label: "label",
  description: "description",
  dsoChange: fn(),
};

export const inputRangeArgTypes: ArgTypes<InputRangeArgs> = {
  dsoChange: argTypeAction(),
  description: {
    control: "text",
  },
  label: {
    control: "text",
  },
  max: {
    control: "number",
  },
  min: {
    control: "number",
  },
  step: {
    control: "number",
  },
  unit: {
    control: "text",
  },
  value: {
    control: "number",
  },
};

export function inputRangeArgsMapper(a: InputRangeArgs): InputRange {
  return { ...a };
}
