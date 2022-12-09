import { ArgTypes } from "../../storybook/index.js";

import { InputNumber } from "./input-number.models.js";

export interface InputNumberArgs {
  label?: string;
  id: string;
  min?: number;
  max?: number;
  count: number;
  minusButtonInactive: boolean;
  plusButtonInactive: boolean;
}

export const inputNumberArgTypes: ArgTypes<InputNumberArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  id: {
    control: {
      type: "string",
    },
  },
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
  count: {
    control: {
      type: "number",
    },
  },
  minusButtonInactive: {
    control: {
      type: "boolean",
    },
  },
  plusButtonInactive: {
    control: {
      type: "boolean",
    },
  },
};

export function inputNumberArgsMapper(a: InputNumberArgs): InputNumber {
  return {
    label: a.label,
    id: a.id,
    min: a.min,
    max: a.max,
    count: a.count,
    minusButtonInactive: a.minusButtonInactive,
    plusButtonInactive: a.plusButtonInactive,
  };
}
