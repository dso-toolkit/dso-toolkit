import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, componentArgs } from "../../storybook";
import { NavbarItem } from "../navbar";

import { Legend } from "./legend.models.js";

export interface LegendArgs {
  navbarItems: NavbarItem[];
  dsoLegendNavbarItemClick: HandlerFunction;
  dsoClose: HandlerFunction;
}

export const legendArgTypes: ArgTypes<LegendArgs> = {
  navbarItems: {
    control: {
      disable: true,
    },
  },
  dsoLegendNavbarItemClick: argTypeAction(),
  dsoClose: argTypeAction(),
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
  dsoLegendNavbarItemClick: fn(),
  dsoClose: fn(),
});

export function legendArgsMapper<TemplateFnReturnType>(
  a: LegendArgs,
  content?: TemplateFnReturnType,
): Legend<TemplateFnReturnType> {
  return {
    ...a,
    navbarItems: a.navbarItems,
    content,
    dsoLegendNavbarItemClick: (event) => {
      event.preventDefault();
      a.dsoLegendNavbarItemClick(event.detail);
      a.dsoClose(event.detail);
    },
  };
}
