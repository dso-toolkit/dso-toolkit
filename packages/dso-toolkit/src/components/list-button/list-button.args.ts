import { ArgTypes } from "../../storybook/index.js";

import { InputNumber } from "../input-number/input-number.models.js";

import { ListButton } from "./list-button.models.js";

export interface ListButtonArgs {
  label: string;
  hasInputNumber?: boolean;
  inputNumber?: InputNumber;
  disabled?: boolean;
  sublabel?: string;
  subcontent?: string;
  count: number;
}

export const listButtonArgTypes: ArgTypes<ListButtonArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  hasInputNumber: {
    control: {
      type: "boolean",
    },
  },
  inputNumber: {
    control: {
      disable: true,
    },
  },
  disabled: {
    control: {
      type: "boolean",
    },
  },
  sublabel: {
    control: {
      type: "text",
    },
  },
  subcontent: {
    control: {
      type: "text",
    },
  },
  count: {
    control: {
      type: "number",
    },
  },
};

export function listButtonArgsMapper(a: ListButtonArgs): ListButton {
  return {
    label: a.label,
    hasInputNumber: a.hasInputNumber,
    inputNumber: a.inputNumber,
    disabled: a.disabled,
    sublabel: a.sublabel,
    subcontent: a.subcontent,
    count: a.count,
  };
}
