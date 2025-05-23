import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { DropdownMenu, DropdownMenuGroup, dropdownMenuStrategy } from "./dropdown-menu.models.js";

export interface DropdownMenuArgs {
  id: string;
  buttonLabel: string;
  buttonVariant: "primary" | "secondary" | "tertiary";
  dropdownAlign: "left" | "right";
  isCheckable: boolean;
  groups: DropdownMenuGroup[];
  boundary: string;
  strategy: (typeof dropdownMenuStrategy)[number];
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
  isCheckable: {
    control: {
      type: "boolean",
    },
  },
  groups: {
    table: {
      disable: true,
    },
  },
  boundary: {
    ...noControl,
  },
  strategy: {
    options: dropdownMenuStrategy,
    control: {
      type: "select",
    },
  },
};

export function dropdownMenuArgsMapper(a: DropdownMenuArgs): DropdownMenu {
  return {
    id: a.id,
    button: {
      label: a.buttonLabel,
      variant: a.buttonVariant,
    },
    dropdownAlign: a.dropdownAlign,
    groups: a.groups,
    isCheckable: a.isCheckable,
    boundary: a.boundary,
    strategy: a.strategy,
  };
}
