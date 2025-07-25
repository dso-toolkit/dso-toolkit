import readme from "@dso-toolkit/core/src/components/button-group/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { ButtonGroupArgs, buttonGroupMeta, buttonGroupStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<ButtonGroupArgs> = {
  ...buttonGroupMeta({ readme }),
  title: "Core/Button Group",
};

export default meta;

const { Default } = buttonGroupStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { buttonGroupTemplate } = templates;

    return {
      buttonGroupTemplate,
    };
  },
});

export { Default };
