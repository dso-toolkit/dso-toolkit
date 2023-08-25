import { ArgTypes } from "@storybook/types";

import { Anchor } from "./anchor.models.js";

export interface AnchorArgs {
  icon?: string;
  iconMode?: "after";
  label: string;
  mode?: "download" | "extern" | undefined;
  modifier?: string;
  url: string;
  ariaCurrent?: string;
}

export const anchorArgTypes: ArgTypes<AnchorArgs> = {
  icon: {
    control: {
      type: "string",
    },
  },
  iconMode: {
    options: [undefined, "after"],
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
  label: {
    control: {
      type: "text",
    },
  },
  url: {
    control: {
      type: "text",
    },
  },
  ariaCurrent: {
    control: {
      type: "text",
    },
  },
};

export function anchorArgsMapper(a: AnchorArgs): Anchor {
  return {
    ...a,
    icon: a.icon
      ? {
          icon: a.icon,
        }
      : undefined,
  };
}
