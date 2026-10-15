import { ArgTypes } from "@storybook/web-components-vite";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";
import { noControl } from "../../shared/no-control.js";
import { Button } from "../button/button.models.js";
import { IconButton } from "../icon-button/icon-button.models.js";

import { ShoppingCart, ShoppingCartItem } from "./shopping-cart.models.js";

export type ShoppingCartHeaderButton = "sluiten" | "alles-verwijderen" | "geen";

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
  mode?: "main" | "side";
  headerButton?: ShoppingCartHeaderButton;
  editable?: boolean;
  removable?: boolean;
  itemMode?: "view" | "edit";
  warning?: boolean;
  buttonClick: HandlerFunction;
  dsoEdit: HandlerFunction;
  dsoDelete: HandlerFunction;
  dsoClose: HandlerFunction;
  dsoSubmit: HandlerFunction;
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
  mode: noControl(),
  headerButton: noControl(),
  editable: noControl(),
  removable: noControl(),
  itemMode: {
    if: { arg: "_implementation", eq: "core" },
    control: {
      type: "select",
      options: ["view", "edit"],
    },
  },
  warning: {
    if: { arg: "_implementation", eq: "core" },
    control: {
      type: "boolean",
    },
  },
  items: noControl(),
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
  buttonClick: argTypeAction(),
  dsoEdit: argTypeAction(),
  dsoDelete: argTypeAction(),
  dsoClose: argTypeAction(),
  dsoSubmit: argTypeAction(),
  _implementation: noControl(),
};

function headerButton(a: ShoppingCartArgs): Button | IconButton | undefined {
  if (a.mode === "side") {
    return a.headerButton === "geen"
      ? undefined
      : {
          icon: "chevron-left",
          variant: "secondary",
          label: "Openen",
          dsoClick: a.buttonClick,
        };
  }

  switch (a.headerButton) {
    case "alles-verwijderen":
      return {
        variant: "tertiary",
        label: "Alles verwijderen",
        icon: { icon: "trash" },
        iconMode: "after",
        onClick: a.buttonClick,
      };
    case "sluiten":
      return {
        variant: "secondary",
        label: "Sluiten",
        icon: { icon: "cross" },
        iconMode: "after",
        onClick: a.buttonClick,
      };
    default:
      return undefined;
  }
}

export function shoppingCartArgsMapper(a: ShoppingCartArgs): ShoppingCart {
  return {
    collapsable: a.collapsable,
    collapsed: a.collapsed,
    hideSummary: a.hideSummary,
    removeAll: a.removeAll,
    isOpen: a.isOpen,
    mode: a.mode,
    button: headerButton(a),
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
  };
}
