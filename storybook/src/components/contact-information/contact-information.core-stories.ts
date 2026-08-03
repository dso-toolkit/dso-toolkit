import readme from "@dso-toolkit/core/src/components/contact-information/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { contactInformationMeta, contactInformationStories } from "dso-toolkit";

import { contactInformationTemplate } from "./contact-information.core-template";

const meta: Meta = {
  ...contactInformationMeta({ readme }),
  title: "Core/Contact Information",
};

export default meta;

const { Default } = contactInformationStories({
  storyTemplates: () => {
    return {
      contactInformationTemplate,
    };
  },
});

export { Default };
