import { type Meta, moduleMetadata } from "@storybook/angular";
import { imageOverlayMeta, imageOverlayStories } from "dso-toolkit";

import { DsoImageOverlay } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

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
