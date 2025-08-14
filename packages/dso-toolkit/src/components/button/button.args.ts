import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { Button, ButtonAnchor } from "./button.models.js";

export interface ButtonArgs {
  element: "button" | "anchor";
  compact?: boolean;
  align?: boolean;
  variant: "primary" | "secondary" | "tertiary" | "map";
  truncate?: boolean;
  click: HandlerFunction;
  type?: "button" | "submit";
  label: string;
  id?: string;
  disabled?: boolean;
  icon?: string;
  iconMode?: "only" | "after";
  mode?: "download" | "extern";
}

export const buttonArgTypes: ArgTypes<ButtonArgs> = {
  element: {
    options: ["button", "anchor"],
    control: {
      type: "select",
    },
  },
  compact: {
    control: {
      type: "boolean",
    },
  },
  align: {
    control: {
      type: "boolean",
    },
  },
  variant: {
    options: ["primary", "secondary", "tertiary", "map"],
    control: {
      type: "select",
    },
  },
  mode: {
    options: [undefined, "download", "extern"],
    control: {
      type: "select",
    },
  },
  truncate: {
    control: {
      type: "boolean",
    },
  },
  click: argTypeAction(),
  type: {
    options: ["button", "submit"],
    control: {
      type: "select",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  id: {
    control: {
      type: "text",
    },
  },
  disabled: {
    control: {
      type: "boolean",
    },
  },
  icon: {
    options: [undefined, "chevron-left", "chevron-right"],
    control: {
      type: "select",
    },
  },
  iconMode: {
    options: [undefined, "only", "after"],
    control: {
      type: "select",
    },
  },
};

export function buttonArgsMapper(a: ButtonArgs): Button | ButtonAnchor {
  switch (a.element) {
    case "anchor":
      return {
        variant: a.variant,
        url: "#",
        label: a.label,
        mode: a.mode,
        icon: a.icon
          ? {
              icon: a.icon,
            }
          : undefined,
        iconMode: a.iconMode,
        id: a.id,
        align: a.align,
      };
    case "button":
      return {
        variant: a.variant,
        truncate: a.truncate,
        onClick: a.click,
        mode: a.mode,
        type: a.type,
        label: a.label,
        id: a.id,
        disabled: a.disabled,
        icon: a.icon
          ? {
              icon: a.icon,
            }
          : undefined,
        iconMode: a.iconMode,
        compact: a.compact,
        align: a.align,
      };
    default:
      throw new Error("Unknown element type for Button component");
  }
}
