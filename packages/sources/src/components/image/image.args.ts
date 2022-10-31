import { ArgTypes } from "../../storybook";

import { Image } from "./image.models";

export interface ImageArgs {
  source: string;
  modifier?: string;
  alt: string;
}

export const imageArgTypes: ArgTypes<ImageArgs> = {
  source: {
    control: {
      disable: true,
    },
  },
  modifier: {
    options: [undefined, "img-responsive", "img-circle"],
    control: {
      type: "select",
    },
  },
  alt: {
    control: {
      type: "text",
    },
  },
};

export function imageArgsMapper(a: ImageArgs): Image {
  return {
    source: a.source,
    modifier: a.modifier,
    alt: a.alt,
  };
}
