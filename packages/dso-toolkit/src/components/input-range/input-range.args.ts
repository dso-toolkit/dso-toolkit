import { ArgTypes } from "@storybook/types";

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

export const inputRangeArgs: Omit<InputRangeArgs, "value" | "min" | "max" | "step" | "dsoChange"> = {
  unit: "%",
  label: "label",
  description: "description",
};

export const inputRangeArgTypes: ArgTypes<InputRangeArgs> = {
  dsoChange: {
    action: "dsoChange",
  },
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
  return {
    ...a,
  };
}
