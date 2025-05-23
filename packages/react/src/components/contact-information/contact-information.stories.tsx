import readme from "@dso-toolkit/react/src/components/contact-information/readme.md?raw";
import { CardContainerArgs, contactInformationMeta, contactInformationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import type { Meta } from "@storybook/react";

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
