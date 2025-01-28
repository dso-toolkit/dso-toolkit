import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/contact-information/readme.md?raw";
import { ContactInformation, contactInformationMeta, contactInformationStories } from "dso-toolkit";
import { content } from "./contact-information.content";

const meta: Meta<ContactInformation> = {
  ...contactInformationMeta({ readme }),
  title: "Core/Contact Information",
};

export default meta;

const { Default } = contactInformationStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { contactInformationTemplate } = templates;

    return {
      contactInformationTemplate,
      content,
    };
  },
});

export { Default };
