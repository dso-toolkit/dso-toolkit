import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { DropdownMenu, DropdownMenuGroup } from "./dropdown-menu.models.js";

export interface DropdownMenuArgs {
  id: string;
  buttonLabel: string;
  buttonVariant: "primary" | "secondary" | "tertiary";
  dropdownAlign: "left" | "right";
  checkable: boolean;
  groups: DropdownMenuGroup[];
  dsoClick: HandlerFunction;
}

export const dropdownMenuArgTypes: ArgTypes<DropdownMenuArgs> = {
  id: {
    control: {
      type: "text",
    },
  },
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
  dropdownAlign: {
    options: ["left", "right"],
    control: {
      type: "select",
    },
  },
  checkable: {
    control: {
      type: "boolean",
    },
  },
  groups: argTypeAction(),
  dsoClick: argTypeAction(),
};

export function dropdownMenuArgsMapper(a: DropdownMenuArgs): DropdownMenu {
  return {
    variant: a.buttonVariant,
    label: a.buttonLabel,
    id: a.id,
    button: {
      label: a.buttonLabel,
      variant: a.buttonVariant,
    },
    dropdownAlign: a.dropdownAlign,
    groups: a.groups,
    checkable: a.checkable,
  };
}
