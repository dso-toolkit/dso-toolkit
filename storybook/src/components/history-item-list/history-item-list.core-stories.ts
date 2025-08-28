import historyItemReadme from "@dso-toolkit/core/src/components/history-item-list/components/history-item/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/history-item-list/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { HistoryItemListArgs, historyItemListMeta, historyItemListStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<HistoryItemListArgs> = {
  ...historyItemListMeta({ readme: `${readme}\n${historyItemReadme}` }),
  title: "Core/History Item List",
};

export default meta;

const { Default } = historyItemListStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { historyItemListTemplate } = templates;

    return {
      historyItemListTemplate,
    };
  },
});

export { Default };
