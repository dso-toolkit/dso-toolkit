import { ArgTypes } from "@storybook/types";

import { FormGroupInputNumber } from "../form.models.js";

export interface FormGroupInputNumberArgs {
  id: string;
  label: string;
  state?: "invalid" | "valid";
  count: number;
  min: number;
  max: number;
  minusButtonInactive: boolean;
  plusButtonInactive: boolean;
}

export const formGroupInputNumberArgTypes: ArgTypes<FormGroupInputNumberArgs> = {
  id: {
    control: {
      type: "text",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  count: {
    control: {
      type: "number",
    },
  },
  state: {
    options: [undefined, "invalid", "valid"],
    control: {
      type: "select",
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

export function formGroupInputNumberArgsMapper<TemplateFnReturnType>(
  a: FormGroupInputNumberArgs,
): FormGroupInputNumber<TemplateFnReturnType> {
  return {
    group: "input-number",
    id: a.id,
    label: a.label,
    count: a.count,
    state: a.state,
    min: a.min,
    max: a.max,
    minusButtonInactive: a.minusButtonInactive,
    plusButtonInactive: a.plusButtonInactive,
  };
}
