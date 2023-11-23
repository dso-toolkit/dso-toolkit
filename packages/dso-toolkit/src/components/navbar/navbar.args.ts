import { ArgTypes } from "@storybook/types";

import { NavBarToggleExtensionEvent, Navbar, NavbarItem } from "./navbar.models.js";

export interface NavbarArgs {
  items: NavbarItem[];
  modifier: string;
  open: boolean;
  extensionOpen?: boolean;
  extensionAnimation?: boolean;
  dsoExtensionToggle(event: NavBarToggleExtensionEvent): void;
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
  extensionOpen: {
    control: {
      type: "boolean",
    },
  },
  extensionAnimation: {
    control: {
      type: "boolean",
    },
  },
  dsoExtensionToggle: {
    action: "dsoExtensionToggle",
  },
};

export function navbarArgsMapper<TemplateFnReturnType>(
  a: NavbarArgs,
  extension?: TemplateFnReturnType,
): Navbar<TemplateFnReturnType> {
  return {
    items: a.items,
    modifier: a.modifier,
    open: a.open,
    extension,
    extensionOpen: !!extension && a.extensionOpen,
    extensionAnimation: !!extension && !!a.extensionAnimation,
    dsoExtensionToggle: (e) => a.dsoExtensionToggle(e),
  };
}
