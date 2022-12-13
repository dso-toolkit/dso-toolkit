import { ArgTypes } from "../../storybook/index.js";
import { images } from "./image-overlay.content.js";
import { ImageOverlay } from "./image-overlay.models.js";

export interface ImageOverlayArgs {
  image: number;
}

export const imageOverlayArgTypes: ArgTypes<ImageOverlayArgs> = {
  image: {
    defaultValue: 0,
    options: [0, 1, 2, 3],
    control: {
      type: "select",
      labels: {
        0: "wide",
        1: "small",
        2: "tall",
        3: "big",
      },
    },
  },
};

export function imageOverlayArgsMapper(a: ImageOverlayArgs): ImageOverlay {
  return {
    image: images[a.image],
  };
}
