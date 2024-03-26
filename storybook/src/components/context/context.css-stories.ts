import type { Meta } from "@storybook/web-components";
import { ContextArgs, contextMeta, contextStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { children, content, label } from "./context.content";

import readme from "dso-toolkit/src/components/context/readme.md?raw";

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

export { Label, Legend, LabelAlignLeft, LegendAlignLeft };
