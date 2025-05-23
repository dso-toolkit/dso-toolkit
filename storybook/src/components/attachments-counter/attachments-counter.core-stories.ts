import readme from "@dso-toolkit/core/src/components/attachments-counter/readme.md?raw";
import { AttachmentsCounterArgs, attachmentsCounterMeta, attachmentsCounterStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import type { Meta } from "@storybook/web-components";

const meta: Meta<AttachmentsCounterArgs> = {
  ...attachmentsCounterMeta({ readme }),
  title: "Core/Attachments Counter",
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
