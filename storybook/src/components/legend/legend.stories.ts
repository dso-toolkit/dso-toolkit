import legendGroupReadme from "@dso-toolkit/core/src/components/legend/legend-group/readme.md?raw";
import legendItemReadme from "@dso-toolkit/core/src/components/legend/legend-item/readme.md?raw";
import legendReadme from "@dso-toolkit/core/src/components/legend/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { decorator } from "./legend-item/legend-item.decorator";
import {
  LegendArgs,
  kaartlagenTabItem,
  legendArgTypes,
  legendArgs,
  legendArgsMapper,
  legendaTabItem,
} from "./legend.args.js";
import { kaartlagenRichContent, legendaRichContent } from "./legend.content.js";
import { legendTemplate } from "./legend.template.js";

type LegendStory = StoryObj<LegendArgs, Renderer>;

const meta: Meta<LegendArgs> = {
  title: "Core/Legend",
  argTypes: legendArgTypes,
  args: legendArgs,
  parameters: {
    docs: {
      page: () => compiler(`${legendReadme}\n${legendGroupReadme}\n${legendItemReadme}`),
    },
  },
};

export default meta;

export const Legenda: LegendStory = {
  decorators: [(story) => decorator(story)],
  render: (args) => legendTemplate(legendArgsMapper(args, legendaRichContent(args))),
};

export const Kaartlagen: LegendStory = {
  args: {
    tabItems: [legendaTabItem, { ...kaartlagenTabItem, active: true }],
  },
  decorators: [(story) => decorator(story)],
  render: (args) => legendTemplate(legendArgsMapper(args, kaartlagenRichContent(args))),
};
