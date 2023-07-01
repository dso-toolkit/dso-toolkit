import { ArgTypes } from "@storybook/types";

import { ShoppingCart, ShoppingCartItem } from "./shopping-cart.models.js";

export interface ShoppingCartArgs {
  collapsable?: boolean;
  collapsed?: boolean;
  hideSummary?: boolean;
  removeAll?: boolean;
  isOpen?: boolean;
  items: ShoppingCartItem[];
  shoppingcartTitleTag: "h2" | "h3";
  shoppingcartTitle: string;
}

export const shoppingCartArgTypes: ArgTypes<ShoppingCartArgs> = {
  collapsable: {
    control: {
      type: "boolean",
    },
  },
  collapsed: {
    control: {
      type: "boolean",
    },
  },
  hideSummary: {
    control: {
      type: "boolean",
    },
  },
  removeAll: {
    control: {
      type: "boolean",
    },
  },
  isOpen: {
    control: {
      type: "boolean",
    },
  },
  items: {
    control: {
      disable: true,
    },
  },
  shoppingcartTitleTag: {
    options: ["h2", "h3"],
    control: {
      type: "select",
    },
  },
  shoppingcartTitle: {
    control: {
      type: "text",
    },
  },
};

export function shoppingCartArgsMapper(a: ShoppingCartArgs): ShoppingCart {
  return {
    collapsable: a.collapsable,
    collapsed: a.collapsed,
    hideSummary: a.hideSummary,
    removeAll: a.removeAll,
    isOpen: a.isOpen,
    items: a.items,
    shoppingcartTitleTag: a.shoppingcartTitleTag,
    shoppingcartTitle: a.shoppingcartTitle,
  };
}
