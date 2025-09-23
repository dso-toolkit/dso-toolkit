import type { Meta } from "@storybook/web-components-vite";
import { LegendArgs, legendMeta, legendStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/legend/readme.md?raw";

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
    };
  },
});

export { Default };
