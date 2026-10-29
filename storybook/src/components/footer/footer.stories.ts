import { Meta, StoryObj } from "@storybook/web-components-vite";

import { children } from "./footer.content.js";
import { footerTemplate } from "./footer.template.js";

const meta: Meta = {
  title: "HTML|CSS/Footer",
  tags: ["!autodocs"],
};

export default meta;

export const Footer: StoryObj = {
  render: () => footerTemplate({ children: children() }),
};
