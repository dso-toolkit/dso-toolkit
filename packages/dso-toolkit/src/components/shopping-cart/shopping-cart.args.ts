import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { ShoppingCart, ShoppingCartItem } from "./shopping-cart.models.js";

export interface ShoppingCartArgs {
  _implementation: "html/css" | "core";
  collapsable?: boolean;
  collapsed?: boolean;
  hideSummary?: boolean;
  removeAll?: boolean;
  isOpen?: boolean;
  items: ShoppingCartItem[];
  shoppingcartTitleTag: "h2" | "h3";
  shoppingcartTitle: string;
  variant?: "main" | "side";
  toggleLabel?: string;
  dsoToggle: HandlerFunction;
  dsoEdit: HandlerFunction;
  dsoDelete: HandlerFunction;
  dsoClose: HandlerFunction;
}

export const shoppingCartArgTypes: ArgTypes<ShoppingCartArgs> = {
  collapsable: {
    if: { arg: "_implementation", eq: "html/css" },
    control: {
      type: "boolean",
    },
  },
  collapsed: {
    if: { arg: "_implementation", eq: "html/css" },
    control: {
      type: "boolean",
    },
  },
  hideSummary: {
    if: { arg: "_implementation", eq: "html/css" },
    control: {
      type: "boolean",
    },
  },
  removeAll: {
    if: { arg: "_implementation", eq: "html/css" },
    control: {
      type: "boolean",
    },
  },
  isOpen: {
    if: { arg: "_implementation", eq: "html/css" },
    control: {
      type: "boolean",
    },
  },
  variant: argTypeAction(),
  toggleLabel: {
    if: { arg: "_implementation", eq: "core" },
    control: {
      type: "text",
    },
  },
  items: argTypeAction(),
  shoppingcartTitleTag: {
    if: { arg: "_implementation", eq: "html/css" },
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
  dsoToggle: argTypeAction(),
  dsoEdit: argTypeAction(),
  dsoDelete: argTypeAction(),
  dsoClose: argTypeAction(),
  _implementation: argTypeAction(),
};

export function shoppingCartArgsMapper(a: ShoppingCartArgs): ShoppingCart {
  return {
    collapsable: a.collapsable,
    collapsed: a.collapsed,
    hideSummary: a.hideSummary,
    removeAll: a.removeAll,
    isOpen: a.isOpen,
    variant: a.variant,
    toggleLabel: a.toggleLabel,
    items: a.items.map((item) => ({
      ...item,
      dsoClose: () => a.dsoClose(),
      dsoEdit: () => a.dsoEdit(),
      dsoDelete: () => a.dsoDelete(),
    })),
    shoppingcartTitleTag: a.shoppingcartTitleTag,
    shoppingcartTitle: a.shoppingcartTitle,
    dsoToggle: () => {
      a.dsoToggle();
    },
  };
}
