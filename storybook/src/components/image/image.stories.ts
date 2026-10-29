import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ImageArgs, imageArgTypes, imageArgsMapper } from "./image.args.js";
import { imageTemplate } from "./image.template.js";

type ImageStory = StoryObj<ImageArgs>;

const meta: Meta<ImageArgs> = {
  title: "HTML|CSS/Image",
  tags: ["!autodocs"],
  argTypes: imageArgTypes,
  args: {
    source: "images/sneeuwpop.png",
    alt: "Afbeelding van een sneeuwpop",
  },

  render: (args) => imageTemplate(imageArgsMapper(args)),
};

export default meta;

export const Default: ImageStory = {};

export const Responsive: ImageStory = {
  args: {
    modifier: "img-responsive",
  },
};

export const Circle: ImageStory = {
  args: {
    modifier: "img-circle",
  },
};
