import type { Meta } from "@storybook/web-components";
import { LegendItemArgs, legendItemMeta, legendItemStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { bodyWithInputRange, bodyWithSelectables } from "./legend-item.content";

import { decorator } from "./legend-item.decorator";

import readme from "@dso-toolkit/core/src/components/legend-item/readme.md?raw";

const meta: Meta<LegendItemArgs> = {
  ...legendItemMeta({ readme }),
  title: "Core/Legend Item",
};

export default meta;

const { Default, WithSelectable, Removable, WithSelectables, WithInputRange } = legendItemStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { legendItemTemplate } = templates;

    return {
      legendItemTemplate,
      bodyWithSelectables,
      bodyWithInputRange,
    };
  },
  decorator,
});

export { Default, WithSelectable, Removable, WithSelectables, WithInputRange };
