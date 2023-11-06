import type { Meta } from "@storybook/web-components";
import { AttachmentsCounterArgs, attachmentsCounterMeta, attachmentsCounterStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/attachments-counter/readme.md?raw";

const meta: Meta<AttachmentsCounterArgs> = {
  ...attachmentsCounterMeta({ readme }),
  title: "HTML|CSS/Attachments Counter",
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
