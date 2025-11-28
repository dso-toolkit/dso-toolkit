import readme from "@dso-toolkit/core/src/components/legend/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { LegendArgs, legendMeta, legendStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { decorator } from "../legend-item/legend-item.decorator";

import { richContent } from "./legend.content";

const meta: Meta<LegendArgs> = {
  ...legendMeta({ readme }),
  title: "Core/Legend",
};

export default meta;

const { Default } = legendStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { legendTemplate } = templates;

    return {
      legendTemplate,
      richContent: richContent(templates),
    };
  },
  decorator,
});

export { Default };
