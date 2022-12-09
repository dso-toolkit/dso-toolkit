import { ArgTypes } from "../../storybook/index.js";

import { Tile } from "./tile.models.js";

export interface TileArgs {
  label: string;
  imageSource: string;
  imageAlt: string;
  variant?: "theme";
}

export const tileArgTypes: ArgTypes<TileArgs> = {
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
  variant: {
    options: [undefined, "theme"],
    control: {
      type: "select",
      labels: {
        undefined: "default",
        theme: "theme",
      },
    },
  },
};

export function tileArgsMapper(a: TileArgs): Tile {
  return {
    anchor: "#",
    label: a.label,
    image: {
      source: a.imageSource,
      alt: a.imageAlt,
    },
    variant: a.variant,
  };
}
