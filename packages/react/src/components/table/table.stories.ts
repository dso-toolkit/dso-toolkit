import type { Meta } from "@storybook/react";
import { TableArgs, tableMeta, tableStories } from "dso-toolkit";
import { defaultTable, imageOverlayTable, sortedAscendingTable, sortedDescendingTable } from "./table.content";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<TableArgs> = {
  ...tableMeta({ readme }),
  title: "Table",
};

export default meta;

const { Default, WithDsoImageOverlay, WithVerticalLines, SortedAscending, SortedDescending } = tableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tableTemplate } = templates;

    return {
      tableTemplate,
      defaultTable,
      imageOverlayTable,
      sortedAscendingTable,
      sortedDescendingTable,
    };
  },
});

export { Default, WithDsoImageOverlay, WithVerticalLines, SortedAscending, SortedDescending };
