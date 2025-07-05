/// <reference types="vite/types/importMeta.d.ts" />
import { ArgTypes } from "storybook/internal/types";

import { Icon } from "./icon.models.js";

export interface IconArgs {
  icon: string;
}

// Storybook 9 Dropped webpack5 Builder Support in Favor of Vite. Maar niet voor Angular Storybook: dat is nog
// webpack5. Met de Vite builder komen environment variabelen beschikbaar op import.meta.env. Met de Webpack
// builder komen environment variabelen beschikbaar op process.env. Onderstaande constructie is nodig om in
// de Core en HTML/CSS Storybook en React Storybook de in .storybook/main.ts gedefinieerde VITE_ICONS en in de
// Angular Storybook de aldaar in .storybook/main.ts gedefinieerde ICONS te benaderen
export const icons: string[] = (import.meta.env?.VITE_ICONS || process?.env.ICONS)?.split(",") || [];

export const iconArgTypes: ArgTypes<IconArgs> = {
  icon: {
    options: icons,
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
