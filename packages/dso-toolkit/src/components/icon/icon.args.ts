import { ArgTypes } from "../../storybook/index.js";
import { Icon } from "./icon.models.js";

export interface IconArgs {
  icon: string;
}

export const iconArgTypes: ArgTypes<IconArgs> = {
  icon: {
    options: ["user", "table"],
    control: {
      type: "select",
    },
  },
};

export function iconArgsMapper(a: IconArgs): Icon {
  return {
    icon: a.icon,
  };
}
