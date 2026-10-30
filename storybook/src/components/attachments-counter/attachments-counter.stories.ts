import { Meta, StoryObj } from "@storybook/web-components-vite";

import {
  AttachmentsCounterArgs,
  attachmentsCounterArgTypes,
  attachmentsCounterArgsMapper,
} from "./attachments-counter.args.js";
import { attachmentsCounterTemplate } from "./attachments-counter.template.js";

type AttachmentsCounterStory = StoryObj<AttachmentsCounterArgs>;

const meta: Meta<AttachmentsCounterArgs> = {
  title: "Core/Attachments Counter",
  tags: ["!autodocs"],
  argTypes: attachmentsCounterArgTypes,
};

export default meta;

export const AttachmentsCounter: AttachmentsCounterStory = {
  args: {
    count: 3,
  },
  render: (args) => attachmentsCounterTemplate(attachmentsCounterArgsMapper(args)),
};
