import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction, noControl } from "../../storybook";

import { ShoppingCart, ShoppingCartItem } from "./shopping-cart.models.js";

export interface ShoppingCartArgs<TemplateFnReturnType> {
  _implementation: "html/css" | "core";
  collapsable?: boolean;
  collapsed?: boolean;
  hideSummary?: boolean;
  removeAll?: boolean;
  isOpen?: boolean;
  items: ShoppingCartItem<TemplateFnReturnType>[];
  shoppingcartTitleTag: "h2" | "h3";
  shoppingcartTitle: string;
  mode?: "main" | "side";
  toggleable?: boolean;
  editable?: boolean;
  removable?: boolean;
  itemMode?: "view" | "edit";
  warning?: boolean;
  dsoToggle: HandlerFunction;
  dsoEdit: HandlerFunction;
  dsoDelete: HandlerFunction;
  dsoClose: HandlerFunction;
  dsoSubmit: HandlerFunction;
}

export const shoppingCartArgTypes: ArgTypes<ShoppingCartArgs<never>> = {
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
  mode: noControl,
  toggleable: {
    if: { arg: "_implementation", eq: "core" },
    control: {
      type: "boolean",
    },
  },
  editable: noControl,
  removable: noControl,
  itemMode: noControl,
  warning: {
    if: { arg: "_implementation", eq: "core" },
    control: {
      type: "boolean",
    },
  },
  items: noControl,
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
  dsoSubmit: argTypeAction(),
  _implementation: noControl,
};

export function shoppingCartArgsMapper<TemplateFnReturnType>(
  a: ShoppingCartArgs<TemplateFnReturnType>,
): ShoppingCart<TemplateFnReturnType> {
  return {
    collapsable: a.collapsable,
    collapsed: a.collapsed,
    hideSummary: a.hideSummary,
    removeAll: a.removeAll,
    isOpen: a.isOpen,
    mode: a.mode,
    toggleable: a.toggleable,
    items: a.items.map((item) => ({
      ...item,
      editable: a.editable ?? item.editable,
      removable: a.removable ?? item.removable,
      form: item.form && {
        ...item.form,
        dsoSubmit: (event) => {
          event.preventDefault();
          a.dsoSubmit(event);
        },
      },
      dsoClose: (event) => a.dsoClose(event),
      dsoEdit: (event) => a.dsoEdit(event),
      dsoDelete: (event) => a.dsoDelete(event),
    })),
    titleTag: a.shoppingcartTitleTag,
    title: a.shoppingcartTitle,
    dsoToggle: (event) => a.dsoToggle(event),
  };
}
