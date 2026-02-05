import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { Label, LabelStatus } from "./label.models.js";

const LABEL_STATUS_OPTIONS: LabelStatus[] = [
  "primary",
  "success",
  "info",
  "warning",
  "error",
  "bright",
  "attention",
  "filter",
  "toegevoegd",
  "verwijderd",
];

export interface LabelArgs {
  status: LabelStatus;
  compact: boolean;
  truncate: boolean;
  label: string;
  removable: boolean;
  dsoRemoveClick: HandlerFunction;
  symbol: string;
}

export const labelArgTypes: ArgTypes<LabelArgs> = {
  status: {
    options: LABEL_STATUS_OPTIONS,
    control: {
      type: "select",
    },
  },
  removable: {
    control: {
      type: "boolean",
    },
  },
  dsoRemoveClick: argTypeAction(),
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
