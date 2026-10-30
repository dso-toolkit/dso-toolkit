import { Meta, StoryObj } from "@storybook/web-components-vite";

import { contactInformationContent } from "./contact-information.content.js";
import { contactInformationTemplate } from "./contact-information.template.js";

const meta: Meta = {
  title: "Core/Contact Information",
  tags: ["!autodocs"],
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
