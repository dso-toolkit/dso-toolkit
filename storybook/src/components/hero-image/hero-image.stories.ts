import readme from "@dso-toolkit/core/src/components/hero-image/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { image } from "./hero-image.content.js";
import { heroImageTemplate } from "./hero-image.template.js";

const meta: Meta = {
  title: "Core/Hero Image",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => heroImageTemplate({ image: image() }),
};
