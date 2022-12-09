import { ArgTypes } from "../../storybook/index.js";

import { Whitebox } from "./whitebox.models.js";

export interface WhiteboxArgs {
  title: string;
  label: string;
  description: string;
  imageSource: string;
  imageAlt: string;
  count?: number;
  icon?: string;
  iconLabel?: string;
}

export const whiteboxArgTypes: ArgTypes<WhiteboxArgs> = {
  count: {
    control: {
      type: "number",
    },
  },
  description: {
    control: {
      type: "text",
    },
  },
  icon: {
    control: {
      type: "text",
    },
  },
  iconLabel: {
    control: {
      type: "text",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  imageSource: {
    control: {
      disable: true,
    },
  },
  imageAlt: {
    control: {
      type: "text",
    },
  },
  title: {
    control: {
      type: "text",
    },
  },
};

export function whiteboxArgsMapper(a: WhiteboxArgs): Whitebox {
  return {
    count: a.count,
    description: a.description,
    icon: a.icon
      ? {
          icon: a.icon,
        }
      : undefined,
    iconLabel: a.iconLabel,
    label: a.label,
    image: {
      source: a.imageSource,
      alt: a.imageAlt,
    },
    title: a.title,
  };
}
