import { Meta, StoryObj } from "@storybook/web-components-vite";

import { RichContentArgs, richContentArgTypes, richContentArgsMapper } from "./rich-content.args.js";
import { children } from "./rich-content.content.js";
import { richContentTemplate } from "./rich-content.template.js";

type RichContentStory = StoryObj<RichContentArgs>;

const meta: Meta<RichContentArgs> = {
  title: "HTML|CSS/Rich Content",
  tags: ["!autodocs"],
  argTypes: richContentArgTypes,
};

export default meta;

export const RichContent: RichContentStory = {
  render: (args) => richContentTemplate(richContentArgsMapper(args, children())),
};
