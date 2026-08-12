import { ArgTypes } from "storybook/internal/types";

import { HeroImage } from "./hero-image.models.js";

export interface HeroImageArgs {
  imageUrl: string;
}

export const heroImageArgs: HeroImageArgs = {
  imageUrl: "images/banner-image.webp",
};

export const heroImageArgTypes: ArgTypes<HeroImageArgs> = {
  imageUrl: {
    control: {
      type: "text",
    },
  },
};

export function heroImageArgsMapper(a: HeroImageArgs): HeroImage {
  return {
    ...a,
  };
}
