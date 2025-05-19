import { ArgTypes } from "@storybook/types";

import { Icon } from "./icon.models.js";

export interface IconArgs {
  icon: string;
}

export const iconArgTypes: ArgTypes<IconArgs> = {
  icon: {
    options: process.env.ICONS?.split(","),
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
