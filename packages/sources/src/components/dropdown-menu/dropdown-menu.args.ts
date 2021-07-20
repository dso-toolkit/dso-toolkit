import { ArgTypes } from "../../stories-helpers";

import { DropdownMenu } from "./dropdown-menu.models";

export interface DropdownMenuArgs<TemplateFnReturnType> {
  dropdownAlign: "left" | "right";
  children: TemplateFnReturnType;
}

export const dropdownMenuArgTypes: ArgTypes<DropdownMenuArgs<unknown>> = {
  dropdownAlign: {
    options: ["left", "right"],
    control: {
      type: "select",
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
};

export function dropdownMenuArgsMapper(
  a: DropdownMenuArgs<any>
): DropdownMenu<any> {
  return {
    dropdownAlign: a.dropdownAlign,
    children: a.children,
  };
}
