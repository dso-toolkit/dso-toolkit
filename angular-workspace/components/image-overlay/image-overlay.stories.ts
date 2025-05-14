import { type Meta, moduleMetadata } from "@storybook/angular";

import { imageOverlayMeta, imageOverlayStories } from "dso-toolkit";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";
import { DsoImageOverlay } from "../../projects/component-library/src/public-api";

const meta: Meta = {
  ...imageOverlayMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoImageOverlay],
    }),
  ],
  title: "Image Overlay",
};

export default meta;

const { ImageOverlay } = imageOverlayStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { imageOverlayTemplate } = templates;

    return {
      imageOverlayTemplate,
    };
  },
});

export { ImageOverlay };
