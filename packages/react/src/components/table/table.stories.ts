import type { Meta } from "@storybook/react";
import { TableArgs, tableMeta, tableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import {
  dataGridTable,
  dataTableTable,
  defaultTable,
  imageOverlayTable,
  sortedAscendingTable,
  sortedDescendingTable,
} from "./table.content";

const meta: Meta<TableArgs> = {
  ...tableMeta({ readme }),
  title: "Table",
};

export default meta;

const { Default, WithDsoImageOverlay, WithVerticalLines, SortedAscending, SortedDescending, DataGrid, DataTable } =
  tableStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { tableTemplate } = templates;

      return {
        tableTemplate,
        defaultTable,
        imageOverlayTable,
        sortedAscendingTable,
        sortedDescendingTable,
        dataGridTable,
        dataTableTable,
      };
    },
  });

export { DataGrid, DataTable, Default, SortedAscending, SortedDescending, WithDsoImageOverlay, WithVerticalLines };
