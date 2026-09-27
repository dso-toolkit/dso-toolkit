import readme from "@dso-toolkit/core/src/components/contact-information/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { contactInformationContent } from "./contact-information.content.js";
import { contactInformationTemplate } from "./contact-information.template.js";

const meta: Meta = {
  title: "Core/Contact Information",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () =>
    contactInformationTemplate({
      ...contactInformationContent(),
      heading: {
        level: 4,
        children: "Gemeente Utrecht",
      },
    }),
};
