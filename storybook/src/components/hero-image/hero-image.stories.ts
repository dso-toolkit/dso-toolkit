import readme from "@dso-toolkit/core/src/components/hero-image/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { image } from "./hero-image.content.js";
import { heroImageTemplate } from "./hero-image.template.js";

type HeroImageStory = StoryObj<Record<string, never>, Renderer>;

const meta: Meta<Record<string, never>> = {
  title: "Core/Hero Image",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: HeroImageStory = {
  render: () => heroImageTemplate({ image }),
};
