import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes } from "@storybook/types";
import { Button, ButtonAnchor } from "./button.models.js";

export interface ButtonArgs {
  element: "button" | "anchor";
  compact?: boolean;
  variant: "primary" | "secondary" | "tertiary";
  truncate?: boolean;
  click: HandlerFunction;
  type?: "button" | "submit";
  label: string;
  id?: string;
  disabled?: boolean;
  icon?: string;
  iconMode?: "only" | "after";
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
  variant: {
    options: ["primary", "secondary", "tertiary"],
    control: {
      type: "select",
    },
  },
  truncate: {
    control: {
      type: "boolean",
    },
  },
  click: {
    action: "onClick",
  },
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
        icon: a.icon
          ? {
              icon: a.icon,
            }
          : undefined,
        iconMode: a.iconMode,
        id: a.id,
      };
    case "button":
      return {
        variant: a.variant,
        truncate: a.truncate,
        onClick: a.click,
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
      };
    default:
      throw new Error("Unknown element type for Button component");
  }
}
