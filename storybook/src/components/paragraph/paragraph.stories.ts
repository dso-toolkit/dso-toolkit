import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/paragraph/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { ParagraphArgs, paragraphArgTypes, paragraphArgsMapper } from "./paragraph.args.js";
import { defaultContent, disclaimerContent } from "./paragraph.content.js";
import { paragraphTemplate } from "./paragraph.template.js";

type ParagraphStory = StoryObj<ParagraphArgs, Renderer>;

const meta: Meta<ParagraphArgs> = {
  title: "HTML|CSS/Paragraph",
  argTypes: paragraphArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: ParagraphStory = {
  render: (args) => paragraphTemplate(paragraphArgsMapper(args, defaultContent)),
};

export const Disclaimer: ParagraphStory = {
  args: {
    variant: "disclaimer",
  },
  render: (args) => paragraphTemplate(paragraphArgsMapper(args, disclaimerContent)),
};
