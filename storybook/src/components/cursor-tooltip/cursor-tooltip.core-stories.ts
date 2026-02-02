import readme from "@dso-toolkit/core/src/components/cursor-tooltip/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { CursorTooltipArgs, cursorTooltipMeta, cursorTooltipStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<CursorTooltipArgs> = {
  ...cursorTooltipMeta({ readme }),
  title: "Core/Cursor Tooltip",
};

export default meta;

const { Default } = cursorTooltipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { cursorTooltipTemplate } = templates;

    return {
      cursorTooltipTemplate,
    };
  },
});

export { Default };
