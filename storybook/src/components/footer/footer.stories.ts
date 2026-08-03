import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/footer/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { children } from "./footer.content.js";
import { footerTemplate } from "./footer.template.js";

type FooterStory = StoryObj<Record<string, never>, Renderer>;

const meta: Meta<Record<string, never>> = {
  title: "HTML|CSS/Footer",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Footer: FooterStory = {
  render: () => footerTemplate({ children: children() }),
};
