import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/image/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { ImageArgs, imageArgTypes, imageArgsMapper } from "./image.args.js";
import { imageTemplate } from "./image.template.js";

type ImageStory = StoryObj<ImageArgs, Renderer>;

const meta: Meta<ImageArgs> = {
  title: "HTML|CSS/Image",
  argTypes: imageArgTypes,
  args: {
    source: "images/sneeuwpop.png",
    alt: "Afbeelding van een sneeuwpop",
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args: ImageArgs) => imageTemplate(imageArgsMapper(args)),
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
