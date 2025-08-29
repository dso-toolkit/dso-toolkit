import historyItemReadme from "@dso-toolkit/core/src/components/history-item-list/components/history-item/readme.md?raw";
import readme from "@dso-toolkit/core/src/components/history-item-list/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { HistoryItemsArgs, historyItemsMeta, historyItemsStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<HistoryItemsArgs> = {
  ...historyItemsMeta({ readme: `${readme}\n${historyItemReadme}` }),
  title: "Core/History Item List",
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
