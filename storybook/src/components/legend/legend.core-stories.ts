import legendReadme from "@dso-toolkit/core/src/components/legend/readme.md?raw";
import legendItemReadme from "@dso-toolkit/core/src/components/legend-item/readme.md?raw";
import legendGroupReadme from "@dso-toolkit/core/src/components/legend/legend-group/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { LegendArgs, legendMeta, legendStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { decorator } from "../legend-item/legend-item.decorator";

import { kaartlagenRichContent, legendaRichContent } from "./legend.content";

function stripDependencies(md: string): string {
  return md.replace(/## Dependencies[\s\S]*?(?=\n---|\n# |$)/, "").replace(/\n-{3,}\n[\s\S]*?\*Built with.*?\*/, "");
}

const readme = [legendReadme, legendGroupReadme, legendItemReadme].map(stripDependencies).join("\n\n---\n\n");

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
      legendaRichContent: (mode) => legendaRichContent(templates, mode),
      kaartlagenRichContent: (mode) => kaartlagenRichContent(templates, mode),
    };
  },
  decorator,
});

export { Kaartlagen, Legenda };
