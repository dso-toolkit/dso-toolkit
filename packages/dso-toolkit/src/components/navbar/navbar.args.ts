import { ArgTypes } from "../../storybook/index.js";

import { Navbar, NavbarItem } from "./navbar.models.js";

export interface NavbarArgs {
  items: NavbarItem[];
  modifier: string;
  open: boolean;
}

export const navbarArgTypes: ArgTypes<NavbarArgs> = {
  items: {
    control: {
      disable: true,
    },
  },
  modifier: {
    options: ["main", "sub"],
    control: {
      type: "select",
    },
  },
  open: {
    control: {
      type: "boolean",
    },
  },
};

export function navbarArgsMapper(a: NavbarArgs): Navbar {
  return {
    items: a.items,
    modifier: a.modifier,
    open: a.open,
  };
}
