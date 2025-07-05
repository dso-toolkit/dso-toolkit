import readme from "@dso-toolkit/core/src/components/attachments-counter/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { AttachmentsCounterArgs, attachmentsCounterMeta, attachmentsCounterStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

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
