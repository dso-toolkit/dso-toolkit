import { Meta, StoryObj } from "@storybook/web-components-vite";

import { decorator } from "./legend-item/legend-item.decorator.js";
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

type LegendStory = StoryObj<LegendArgs>;

const meta: Meta<LegendArgs> = {
  title: "Core/Legend",
  tags: ["!autodocs"],
  argTypes: legendArgTypes,
  args: legendArgs,
  decorators: [decorator],
};

export default meta;

export const Legenda: LegendStory = {
  render: (args) => legendTemplate(legendArgsMapper(args, legendaRichContent(args))),
};

export const Kaartlagen: LegendStory = {
  args: {
    tabItems: [legendaTabItem, { ...kaartlagenTabItem, active: true }],
  },
  render: (args) => legendTemplate(legendArgsMapper(args, kaartlagenRichContent(args))),
};
