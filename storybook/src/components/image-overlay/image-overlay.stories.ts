import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ImageOverlayArgs, imageOverlayArgTypes, imageOverlayArgsMapper } from "./image-overlay.args.js";
import { imageOverlayTemplate } from "./image-overlay.template.js";

type ImageOverlayStory = StoryObj<ImageOverlayArgs>;

const meta: Meta<ImageOverlayArgs> = {
  title: "Core/Image Overlay",
  tags: ["!autodocs"],
  argTypes: imageOverlayArgTypes,
  args: {
    image: 0,
    title: "Afbeelding 1",
  },
};

export default meta;

export const ImageOverlay: ImageOverlayStory = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => imageOverlayTemplate(imageOverlayArgsMapper(args)),
};
