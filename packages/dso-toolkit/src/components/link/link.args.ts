import { ArgTypes } from "@storybook/types";

import { Link } from "./link.models.js";

export interface LinkArgs {
  icon?: string;
  iconMode?: "after";
  label: string;
  mode?: "download" | "extern" | undefined;
  modifier?: string;
  url: string;
  ariaCurrent?: string;
}

export const linkArgTypes: ArgTypes<LinkArgs> = {
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

export function linkArgsMapper(a: LinkArgs): Link {
  return {
    ...a,
    icon: a.icon
      ? {
          icon: a.icon,
        }
      : undefined,
  };
}
