import { Meta } from "@storybook/react";

import { imageOverlayMeta, imageOverlayStories } from "dso-toolkit";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta = {
  ...imageOverlayMeta({ readme }),
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
