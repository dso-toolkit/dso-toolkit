import readme from "@dso-toolkit/core/src/components/history-item/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { HistoryItemArgs, historyItemMeta, historyItemStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<HistoryItemArgs> = {
  ...historyItemMeta({ readme }),
  title: "Core/History Item",
};

export default meta;

const { Default } = historyItemStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { historyItemTemplate } = templates;

    return {
      historyItemTemplate,
    };
  },
});

export { Default };
