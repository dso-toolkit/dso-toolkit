import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ImageOverlayArgs, imageOverlayArgTypes, imageOverlayArgsMapper } from "./image-overlay.args.js";
import { imageOverlayTemplate } from "./image-overlay.template.js";

type ImageOverlayStory = StoryObj<ImageOverlayArgs>;

const meta: Meta<ImageOverlayArgs> = {
  title: "Core/Image Overlay",
  argTypes: imageOverlayArgTypes,
  args: {
    image: 0,
    title: "Afbeelding 1",
    bijschrift: "Bijschrift bij afbeelding",
  },
};

export default meta;

export const ImageOverlay: ImageOverlayStory = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => imageOverlayTemplate(imageOverlayArgsMapper(args)),
};

export const ImageOverlayMetAlleenTitel: ImageOverlayStory = {
  ...ImageOverlay,
  name: "Image Overlay met alleen titel",
  args: {
    bijschrift: "",
  },
};

export const ImageOverlayMetAlleenBijschrift: ImageOverlayStory = {
  ...ImageOverlay,
  name: "Image Overlay met alleen bijschrift",
  args: {
    title: "",
  },
};
