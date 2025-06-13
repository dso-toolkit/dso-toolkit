import readme from "@dso-toolkit/core/src/components/legend-item/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { LegendItemArgs, legendItemMeta, legendItemStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { defaultSymbol } from "./legend-item.content";
import { decorator } from "./legend-item.decorator";

const meta: Meta<LegendItemArgs> = {
  ...legendItemMeta({ readme }),
  title: "Core/Legend Item",
};

export default meta;

const { Default } = legendItemStories({
  templateContainer,
  storyTemplates: ({ legendItemTemplate, inputRangeTemplate }) => {
    const bodyWithInputRange = inputRangeTemplate({ label: "Transparantie", unit: "%" });

    return {
      legendItemTemplate,
      bodyWithInputRange,
      defaultSymbol,
    };
  },
  decorator,
});

export { Default };
