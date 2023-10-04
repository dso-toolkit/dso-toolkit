import type { Meta } from "@storybook/web-components";
import { attachmentsCounterArgTypes, attachmentsCounterStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  component: "dso-attachments-counter",
  title: "HTML|CSS/Attachments Counter",
  argTypes: attachmentsCounterArgTypes,
};

export default meta;

const { Count } = attachmentsCounterStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { attachmentsCounterTemplate } = templates;

    return {
      attachmentsCounterTemplate,
    };
  },
});

export { Count };
