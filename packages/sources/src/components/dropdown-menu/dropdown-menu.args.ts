import { ArgTypes } from "../../stories-helpers";

import { DropdownMenu } from "./dropdown-menu.models";

export interface DropdownMenuArgs {
  buttonLabel: string;
  buttonVariant: 'primary' | 'secondary' | 'tertiary';
  dropdownAlign: "left" | "right";
  children: string;
  isCheckable: boolean;
}

export const dropdownMenuArgTypes: ArgTypes<DropdownMenuArgs> = {
  buttonLabel: {
    control: {
      type: 'text'
    }
  },
  buttonVariant: {
    options: ['primary', 'secondary', 'tertiary'],
    control: {
      type: 'select'
    }
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
  children: {
    table: {
      disable: true,
    },
  },
};

export function dropdownMenuArgsMapper(
  a: DropdownMenuArgs
): DropdownMenu {
  return {
    button: {
      label: a.buttonLabel,
      variant: a.buttonVariant
    },
    dropdownAlign: a.dropdownAlign,
    children: a.children,
    isCheckable: a.isCheckable,
  };
}
