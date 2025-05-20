import { AttachmentsCounterArgs, attachmentsCounterMeta, attachmentsCounterStories } from "dso-toolkit";

import readme from "@dso-toolkit/react/src/components/attachments-counter/readme.md?raw";

import { templateContainer } from "../../templates";

import type { Meta } from "@storybook/react";

const meta: Meta<AttachmentsCounterArgs> = {
  ...attachmentsCounterMeta({ readme }),
  title: "Attachments Counter",
};

export default meta;

const { AttachmentsCounter } = attachmentsCounterStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { attachmentsCounterTemplate } = templates;

    return {
      attachmentsCounterTemplate,
    };
  },
});

export { AttachmentsCounter };
