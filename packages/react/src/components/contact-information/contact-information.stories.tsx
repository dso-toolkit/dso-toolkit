import readme from "@dso-toolkit/react/src/components/contact-information/readme.md?raw";
import type { Meta } from "@storybook/react-vite";
import { CardContainerArgs, contactInformationMeta, contactInformationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

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
