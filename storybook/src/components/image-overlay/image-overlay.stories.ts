import readme from "@dso-toolkit/core/src/components/image-overlay/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { ImageOverlayArgs, imageOverlayArgTypes, imageOverlayArgsMapper } from "./image-overlay.args.js";
import { imageOverlayTemplate } from "./image-overlay.template.js";

type ImageOverlayStory = StoryObj<ImageOverlayArgs, Renderer>;

const meta: Meta<ImageOverlayArgs> = {
  title: "Core/Image Overlay",
  argTypes: imageOverlayArgTypes,
  args: {
    image: 0,
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const ImageOverlay: ImageOverlayStory = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => imageOverlayTemplate(imageOverlayArgsMapper(args)),
};
