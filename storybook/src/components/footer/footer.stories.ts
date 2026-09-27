import { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/footer/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { children } from "./footer.content.js";
import { footerTemplate } from "./footer.template.js";

const meta: Meta = {
  title: "HTML|CSS/Footer",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Footer: StoryObj = {
  render: () => footerTemplate({ children: children() }),
};
