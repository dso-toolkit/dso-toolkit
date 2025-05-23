import readme from "@dso-toolkit/core/src/components/advanced-select/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { AdvancedSelectArgs, advancedSelectMeta, advancedSelectStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<AdvancedSelectArgs> = {
  ...advancedSelectMeta({ readme }),
  title: "Core/Advanced Select",
};

export default meta;

const { Default } = advancedSelectStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { advancedSelectTemplate } = templates;

    return {
      advancedSelectTemplate,
    };
  },
});

export { Default };
