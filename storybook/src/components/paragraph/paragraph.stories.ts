import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ParagraphArgs, paragraphArgTypes, paragraphArgsMapper } from "./paragraph.args.js";
import { defaultContent, disclaimerContent } from "./paragraph.content.js";
import { paragraphTemplate } from "./paragraph.template.js";

type ParagraphStory = StoryObj<ParagraphArgs>;

const meta: Meta<ParagraphArgs> = {
  title: "HTML|CSS/Paragraph",
  tags: ["!autodocs"],
  argTypes: paragraphArgTypes,
};

export default meta;

export const Default: ParagraphStory = {
  render: (args) => paragraphTemplate(paragraphArgsMapper(args, defaultContent())),
};

export const Disclaimer: ParagraphStory = {
  args: {
    variant: "disclaimer",
  },
  render: (args) => paragraphTemplate(paragraphArgsMapper(args, disclaimerContent())),
};
