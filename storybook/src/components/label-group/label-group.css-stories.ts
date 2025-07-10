import type { Meta } from "@storybook/web-components-vite";
import { labelGroupMeta, labelGroupStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/label-group/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta = {
  ...labelGroupMeta({ readme }),
  title: "HTML|CSS/Label Group",
};

export default meta;

const { LabelGroup } = labelGroupStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { labelGroupTemplate } = templates;

    return {
      labelGroupTemplate,
    };
  },
});

export { LabelGroup };
