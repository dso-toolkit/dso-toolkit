import type { Meta } from "@storybook/react-vite";
import { CardContainerArgs, contactInformationMeta, contactInformationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<CardContainerArgs> = {
  ...contactInformationMeta({ readme }),
  title: "Contact Information",
};

export default meta;

const { Default } = contactInformationStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { contactInformationTemplate } = templates;

    return {
      contactInformationTemplate,
    };
  },
});

export { Default };
