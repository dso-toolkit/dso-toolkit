import readme from "@dso-toolkit/core/src/components/attachments-counter/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  AttachmentsCounterArgs,
  attachmentsCounterArgTypes,
  attachmentsCounterArgsMapper,
} from "./attachments-counter.args.js";
import { attachmentsCounterTemplate } from "./attachments-counter.template.js";

type AttachmentsCounterStory = StoryObj<AttachmentsCounterArgs, Renderer>;

const meta: Meta<AttachmentsCounterArgs> = {
  title: "Core/Attachments Counter",
  argTypes: attachmentsCounterArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const AttachmentsCounter: AttachmentsCounterStory = {
  args: {
    count: 3,
  },
  render: (args: AttachmentsCounterArgs) => attachmentsCounterTemplate(attachmentsCounterArgsMapper(args)),
};
