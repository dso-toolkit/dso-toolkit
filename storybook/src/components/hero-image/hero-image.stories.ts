import { Meta, StoryObj } from "@storybook/web-components-vite";

import { image } from "./hero-image.content.js";
import { heroImageTemplate } from "./hero-image.template.js";

const meta: Meta = {
  title: "Core/Hero Image",
  tags: ["!autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => heroImageTemplate({ image: image() }),
};
