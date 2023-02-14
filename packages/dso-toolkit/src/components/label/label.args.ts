import { HandlerFunction } from "@storybook/addon-actions";

import { Label } from "./label.models.js";

import { ArgTypes } from "../../storybook/index.js";

export interface LabelArgs {
  status: "primary" | "info" | "success" | "warning" | "danger" | "error" | "bright";
  compact: boolean;
  truncate: boolean;
  label: string;
  removable: boolean;
  dsoRemoveClick: HandlerFunction;
  symbol: string;
}

export const labelArgTypes: ArgTypes<LabelArgs> = {
  status: {
    options: ["primary", "success", "info", "warning", "danger", "error", "bright"],
    control: {
      type: "select",
    },
  },
  removable: {
    control: {
      type: "boolean",
    },
  },
  dsoRemoveClick: {
    action: "dsoRemoveClick",
  },
  compact: {
    control: {
      type: "boolean",
    },
  },
  truncate: {
    control: {
      type: "boolean",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  symbol: {
    control: {
      type: "text",
    },
  },
};

export function labelArgsMapper(a: LabelArgs): Required<Label> {
  return { ...a };
}
