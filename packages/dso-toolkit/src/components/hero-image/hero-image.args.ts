import { ArgTypes } from "storybook/internal/types";

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
