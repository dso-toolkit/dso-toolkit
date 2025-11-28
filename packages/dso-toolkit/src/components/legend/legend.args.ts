import { ArgTypes } from "storybook/internal/types";

import { componentArgs } from "../../storybook";
import { NavbarItem } from "../navbar";

import { Legend } from "./legend.models.js";

export interface LegendArgs {
  navbarItems: NavbarItem[];
}

export const legendArgTypes: ArgTypes<LegendArgs> = {
  navbarItems: {
    control: {
      disable: true,
    },
  },
};

export const legendArgs = componentArgs<LegendArgs>({
  navbarItems: [
    {
      label: "Legenda",
      active: true,
      href: "#",
    },
    {
      label: "Kaartlagen",
      href: "#",
    },
  ],
});

export function legendArgsMapper<TemplateFnReturnType>(
  a: LegendArgs,
  children?: TemplateFnReturnType,
): Legend<TemplateFnReturnType> {
  return {
    ...a,
    navbarItems: a.navbarItems,
    children,
  };
}
