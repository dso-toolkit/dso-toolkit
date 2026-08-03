import readme from "@dso-toolkit/core/src/components/contact-information/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { contactInformationContent } from "./contact-information.content.js";
import { contactInformationTemplate } from "./contact-information.template.js";

type ContactInformationStory = StoryObj<Record<string, never>, Renderer>;

const meta: Meta<Record<string, never>> = {
  title: "Core/Contact Information",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: ContactInformationStory = {
  render: () =>
    contactInformationTemplate({
      ...contactInformationContent,
      heading: {
        level: 4,
        children: "Gemeente Utrecht",
      },
    }),
};
