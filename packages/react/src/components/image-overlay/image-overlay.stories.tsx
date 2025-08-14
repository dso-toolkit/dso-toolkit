import { Meta } from "@storybook/react-vite";
import { imageOverlayMeta, imageOverlayStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

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
