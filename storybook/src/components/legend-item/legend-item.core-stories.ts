import readme from "@dso-toolkit/core/src/components/legend-item/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { LegendItemArgs, legendItemMeta, legendItemStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { content, defaultSymbol } from "./legend-item.content";
import { decorator } from "./legend-item.decorator";

const meta: Meta<LegendItemArgs> = {
  ...legendItemMeta({ readme }),
  title: "Core/Legend Item",
};

export default meta;

const { Default, NotActivatable, NoOptions, NoSymbol, OnlySymbol } = legendItemStories({
  templateContainer,
  storyTemplates: ({ legendItemTemplate, inputRangeTemplate }) => {
    const optionsWithInputRange = inputRangeTemplate({ label: "Transparantie", unit: "%" });

    return {
      legendItemTemplate,
      optionsWithInputRange,
      defaultSymbol,
      content,
    };
  },
  decorator,
});

export { Default, NoOptions, NoSymbol, NotActivatable, OnlySymbol };
