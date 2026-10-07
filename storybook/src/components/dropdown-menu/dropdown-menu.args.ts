import { ArgTypes } from "@storybook/web-components-vite";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";
import { noControl } from "../../shared/no-control.js";

import { DropdownMenu, DropdownMenuGroup } from "./dropdown-menu.models.js";

export interface DropdownMenuArgs {
  buttonLabel: string;
  buttonVariant: "primary" | "secondary" | "tertiary";
  checkable: boolean;
  dropdownMenuPosition: "left" | "right";
  groups: DropdownMenuGroup[];
  dsoClick: HandlerFunction;
}

export const dropdownMenuArgTypes: ArgTypes<DropdownMenuArgs> = {
  buttonLabel: {
    control: {
      type: "text",
    },
  },
  buttonVariant: {
    options: ["primary", "secondary", "tertiary"],
    control: {
      type: "select",
    },
  },
  checkable: {
    control: {
      type: "boolean",
    },
  },
  dropdownMenuPosition: {
    options: ["left", "right"],
    control: {
      type: "radio",
    },
  },
  groups: noControl(),
  dsoClick: argTypeAction(),
};

export function dropdownMenuArgsMapper(a: DropdownMenuArgs): DropdownMenu {
  return {
    variant: a.buttonVariant,
    label: a.buttonLabel,
    groups: a.groups,
    checkable: a.checkable,
  };
}
