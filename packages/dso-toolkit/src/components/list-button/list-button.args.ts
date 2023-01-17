import { ArgTypes, noControl } from "../../storybook/index.js";
import { HandlerFunction } from "@storybook/addon-actions";

import { ListButton } from "./list-button.models.js";

export interface ListButtonArgs {
  label: string;
  disabled?: boolean;
  sublabel?: string;
  subcontent?: string;
  checked?: boolean;
  count?: number;
  min?: number;
  max?: number;
  dsoCountChange: HandlerFunction;
  dsoSelectedChange: HandlerFunction;
}

export const listButtonArgTypes: ArgTypes<ListButtonArgs> = {
  label: {
    control: {
      type: "text",
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
  checked: {
    control: {
      type: "boolean",
    },
  },
  count: {
    control: {
      type: "number",
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
  dsoCountChange: {
    ...noControl,
    action: "dsoCountChange",
  },
  dsoSelectedChange: {
    ...noControl,
    action: "dsoSelectedChange",
  },
};

export function listButtonArgsMapper(a: ListButtonArgs): ListButton {
  return {
    ...a,
  };
}

export function listButtonDefaultArgs(a: Partial<ListButton>): Partial<ListButton> {
  return a;
}
