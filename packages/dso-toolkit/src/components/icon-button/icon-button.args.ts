import { ArgTypes } from "storybook/internal/types";

import { IconButton } from "./icon-button.models";

export interface IconButtonArgs {
  variant?: "secondary" | "tertiary";
  icon: string;
  accessibleLabel: string;
}

export const iconButtonArgs: IconButtonArgs = {
  variant: "secondary",
  icon: "chevron-left",
  accessibleLabel: "menu",
};

export function iconButtonArgTypes(icons: string[]): ArgTypes<IconButtonArgs> {
  return {
    variant: {
      options: ["secondary", "tertiary"],
      control: {
        type: "select",
      },
    },
    icon: {
      options: icons,
      control: {
        type: "select",
      },
    },
    accessibleLabel: {
      control: {
        type: "text",
      },
    },
  };
}

export function iconButtonArgsMapper(a: IconButtonArgs): IconButton {
  return {
    ...a,
    variant: a.variant,
    icon: a.icon,
    accessibleLabel: a.accessibleLabel,
  };
}
