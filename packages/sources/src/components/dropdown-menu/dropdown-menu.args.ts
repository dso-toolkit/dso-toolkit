import { ArgTypes } from "../../storybook";

import { DropdownMenu, DropdownMenuGroup } from "./dropdown-menu.models";

export interface DropdownMenuArgs {
  id: string;
  buttonLabel: string;
  buttonVariant: "primary" | "secondary" | "tertiary";
  dropdownAlign: "left" | "right";
  isCheckable: boolean;
  groups: DropdownMenuGroup[];
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
  };
}
