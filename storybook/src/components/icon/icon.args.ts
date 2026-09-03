import { ArgTypes } from "storybook/internal/types";

import { Icon, IconAlias } from "./icon.models.js";

export interface IconArgs {
  icon: IconAlias;
}

export function iconArgTypes(icons: string[]): ArgTypes<IconArgs> {
  return {
    icon: {
      options: icons,
      control: {
        type: "select",
      },
    },
  };
}

export function iconArgsMapper(a: IconArgs): Icon {
  return {
    icon: a.icon,
  };
}
