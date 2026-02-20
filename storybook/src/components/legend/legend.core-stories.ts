import legendGroupReadme from "@dso-toolkit/core/src/components/legend/legend-group/readme.md?raw";
import legendItemReadme from "@dso-toolkit/core/src/components/legend/legend-item/readme.md?raw";
import legendReadme from "@dso-toolkit/core/src/components/legend/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { LegendArgs, legendMeta, legendStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { decorator } from "./legend-item/legend-item.decorator";
import { kaartlagenRichContent, legendaRichContent } from "./legend.content";

const meta: Meta<LegendArgs> = {
  ...legendMeta({ readme: `${legendReadme}\n${legendGroupReadme}\n${legendItemReadme}` }),
  title: "Core/Legend",
};

export default meta;

const { Legenda, Kaartlagen } = legendStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { legendTemplate } = templates;

    return {
      legendTemplate,
      legendaRichContent: (mode, dsoLegendGroupModeChange, dsoDelete) =>
        legendaRichContent(templates, mode, dsoLegendGroupModeChange, dsoDelete),
      kaartlagenRichContent: (mode, dsoLegendGroupModeChange, dsoDelete) =>
        kaartlagenRichContent(templates, mode, dsoLegendGroupModeChange, dsoDelete),
    };
  },
  decorator,
});

export { Kaartlagen, Legenda };
