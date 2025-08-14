import type { Meta } from "@storybook/web-components-vite";
import { ContextArgs, contextMeta, contextStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/context/readme.md?raw";

import { templateContainer } from "../../templates";

import { children, content, label } from "./context.content";

const meta: Meta<ContextArgs> = {
  ...contextMeta({ readme }),
  title: "HTML|CSS/Context",
};

export default meta;

const { Label, Legend, LabelAlignLeft, LegendAlignLeft } = contextStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { contextTemplate } = templates;

    return {
      contextTemplate,
      children,
      content,
      label,
    };
  },
});

export { Label, LabelAlignLeft, Legend, LegendAlignLeft };
