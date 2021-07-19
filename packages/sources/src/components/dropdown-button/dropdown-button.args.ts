import { ArgTypes } from "../../stories-helpers";

import { DropdownButton } from "./dropdown-button.models";

export interface DropdownButtonArgs {
  label: string;
  variant: "primary" | "secondary" | "tertiary";
}

export const dropdownButtonArgTypes: ArgTypes<DropdownButtonArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  variant: {
    options: ["primary", "secondary", "tertiary"],
    control: {
      type: "select",
    },
  },
};

export function dropdownButtonArgsMapper(
  a: DropdownButtonArgs
): DropdownButton {
  return {
    label: a.label,
    variant: a.variant,
  };
}
