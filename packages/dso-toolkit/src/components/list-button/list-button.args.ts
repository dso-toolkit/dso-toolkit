import { ArgTypes } from "@storybook/types";
import { HandlerFunction } from "@storybook/addon-actions";

import { noControl } from "../../storybook/index.js";

import { ListButton } from "./list-button.models.js";

export interface ListButtonArgs {
  label: string;
  hasInputNumber?: boolean;
  disabled?: boolean;
  sublabel?: string;
  subcontent?: string;
  subcontentPrefix?: string;
  checked?: boolean;
  count?: number;
  min?: number;
  max?: number;
  manual: boolean;
  dsoCountChange: HandlerFunction;
  dsoSelectedChange: HandlerFunction;
}

export const listButtonArgTypes: ArgTypes<ListButtonArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  hasInputNumber: {
    ...noControl,
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
  subcontentPrefix: {
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
  manual: {
    control: {
      type: "boolean",
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
