import type { Meta } from "@storybook/web-components";
import { TableArgs, tableMeta, tableStories } from "dso-toolkit";
import { defaultTable, imageOverlayTable, sortedAscendingTable, sortedDescendingTable } from "./table.content";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/table/readme.md?raw";

const meta: Meta<TableArgs> = {
  ...tableMeta({ readme }),
  title: "Core/Table",
};

export default meta;

const { Default, WithDsoImageOverlay, WithVerticalLines, SortedAscending, SortedDescending } = tableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tableTemplate } = templates;

    return {
      tableTemplate,
      defaultTable: defaultTable(templates),
      imageOverlayTable: imageOverlayTable(templates),
      sortedAscendingTable: sortedAscendingTable(templates),
      sortedDescendingTable: sortedDescendingTable(templates),
    };
  },
});

export { Default, WithDsoImageOverlay, WithVerticalLines, SortedAscending, SortedDescending };