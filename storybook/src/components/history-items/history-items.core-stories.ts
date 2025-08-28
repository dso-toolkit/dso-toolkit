import historyItemReadme from "@dso-toolkit/core/src/components/history-items/components/history-item/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/history-items/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { HistoryItemsArgs, historyItemsMeta, historyItemsStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<HistoryItemsArgs> = {
  ...historyItemsMeta({ readme: `${readme}\n${historyItemReadme}` }),
  title: "Core/History Items",
};

export default meta;

const { Default } = historyItemsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { historyItemsTemplate } = templates;

    return {
      historyItemsTemplate,
    };
  },
});

export { Default };
