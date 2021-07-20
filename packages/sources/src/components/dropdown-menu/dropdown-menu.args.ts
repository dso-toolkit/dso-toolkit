import { ArgTypes } from "../../stories-helpers";

import { DropdownMenu } from "./dropdown-menu.models";

export interface DropdownMenuArgs {
  dropdownAlign: "left" | "right";
}

export const dropdownMenuArgTypes: ArgTypes<DropdownMenuArgs> = {
  dropdownAlign: {
    options: ["left", "right"],
    control: {
      type: "select",
    },
  },
};

export function dropdownMenuArgsMapper(a: DropdownMenuArgs): DropdownMenu {
  return {
    dropdownAlign: a.dropdownAlign,
  };
}
