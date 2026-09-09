import readme from "@dso-toolkit/core/src/components/expandable/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { ExpandableArgs, expandableArgTypes, expandableArgsMapper } from "./expandable.args.js";
import { expandableContent } from "./expandable.content.js";
import { decorator } from "./expandable.decorator";
import { expandableTemplate } from "./expandable.template.js";

type ExpandableStory = StoryObj<ExpandableArgs, Renderer>;

const meta: Meta<ExpandableArgs> = {
  title: "Core/Expandable",
  argTypes: expandableArgTypes,
  args: {
    open: false,
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
    html: {
      root: "#expandable-mock",
    },
  },
  render: (args: ExpandableArgs) => expandableTemplate(expandableArgsMapper(args, expandableContent)),
};

export default meta;

export const Default: ExpandableStory = {
  args: {
    enableAnimation: false,
  },
  decorators: [(story) => decorator(story)],
  parameters: {
    layout: "fullscreen",
  },
};

export const WithAnimation: ExpandableStory = {
  args: {
    enableAnimation: true,
  },
  decorators: [(story) => decorator(story)],
  parameters: {
    layout: "fullscreen",
  },
};
