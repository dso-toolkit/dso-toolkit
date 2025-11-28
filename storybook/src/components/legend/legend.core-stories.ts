import readme from "@dso-toolkit/core/src/components/legend/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { LegendArgs, legendMeta, legendStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { decorator } from "../legend-item/legend-item.decorator";

import { kaartlagenRichContent, legendaRichContent } from "./legend.content";

const meta: Meta<LegendArgs> = {
  ...legendMeta({ readme }),
  title: "Core/Legend",
};

export default meta;

const { Legenda, Kaartlagen } = legendStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { legendTemplate } = templates;

    return {
      legendTemplate,
      legendaRichContent: legendaRichContent(templates),
      kaartlagenRichContent: kaartlagenRichContent(templates),
    };
  },
  decorator,
});

export { Kaartlagen, Legenda };
