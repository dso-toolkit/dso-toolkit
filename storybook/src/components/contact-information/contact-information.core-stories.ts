import readme from "@dso-toolkit/core/src/components/contact-information/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { contactInformationMeta, contactInformationStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
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
    };
  },
});

export { Default };
