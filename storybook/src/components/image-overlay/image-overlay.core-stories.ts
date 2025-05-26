import readme from "@dso-toolkit/core/src/components/image-overlay/readme.md?raw";
import { Meta } from "@storybook/web-components";
import { imageOverlayMeta, imageOverlayStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  ...imageOverlayMeta({ readme }),
  title: "Core/Image Overlay",
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
