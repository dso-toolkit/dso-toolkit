import { ArgTypes } from "../../stories-helpers";

import { DropdownMenu } from "./dropdown-menu.models";

export interface DropdownMenuArgs<TemplateFnReturnType> {
  buttonLabel: string;
  buttonVariant: 'primary' | 'secondary' | 'tertiary';
  dropdownAlign: "left" | "right";
  isCheckable: boolean;
  children: TemplateFnReturnType;
}

export const dropdownMenuArgTypes: ArgTypes<DropdownMenuArgs<unknown>> = {
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
      disable: true
    }
  }
};

export function dropdownMenuArgsMapper(a: DropdownMenuArgs<any>): DropdownMenu<any> {
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
