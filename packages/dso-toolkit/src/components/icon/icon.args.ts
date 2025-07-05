/// <reference types="vite/types/importMeta.d.ts" />
import { ArgTypes } from "storybook/internal/types";

import { Icon } from "./icon.models.js";

export interface IconArgs {
  icon: string;
}

export const iconArgTypes: ArgTypes<IconArgs> = {
  icon: {
    options: import.meta.env.VITE_ICONS?.split(","),
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
