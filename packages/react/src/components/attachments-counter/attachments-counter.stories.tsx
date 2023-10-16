import type { Meta } from "@storybook/react";
import { AttachmentsCounterArgs, attachmentsCounterMeta, attachmentsCounterStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { DsoAttachmentsCounter } from "../../components";

import readme from "@dso-toolkit/react/src/components/attachments-counter/readme.md?raw";

const meta: Meta<AttachmentsCounterArgs> = {
  ...attachmentsCounterMeta({ readme }),
  component: DsoAttachmentsCounter,
  title: "Attachments Counter",
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
