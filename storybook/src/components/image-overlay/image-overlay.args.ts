import { ArgTypes } from "@storybook/web-components-vite";

import { images } from "./image-overlay.content.js";
import { ImageOverlay } from "./image-overlay.models.js";

export interface ImageOverlayArgs {
  image: 0 | 1 | 2 | 3;
  title?: string;
  bijschrift?: string;
  wijzigactie?: "voegtoe" | "verwijder";
}

export const imageOverlayArgTypes: ArgTypes<ImageOverlayArgs> = {
  title: {
    control: {
      type: "text",
    },
  },
  bijschrift: {
    control: {
      type: "text",
    },
  },
  wijzigactie: {
    options: [undefined, "voegtoe", "verwijder"],
    control: {
      type: "select",
    },
  },
  image: {
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
    image: images()[a.image],
    title: a.title,
    bijschrift: a.bijschrift,
    wijzigactie: a.wijzigactie,
  };
}
