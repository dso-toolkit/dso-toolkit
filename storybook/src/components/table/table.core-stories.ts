import readme from "@dso-toolkit/core/src/components/table/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { TableArgs, tableMeta, tableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import {
  dataGridTable,
  defaultTable,
  imageOverlayTable,
  sortedAscendingTable,
  sortedDescendingTable,
} from "./table.content";

const meta: Meta<TableArgs> = {
  ...tableMeta({ readme }),
  title: "Core/Table",
};

export default meta;

const { Default, WithDsoImageOverlay, WithVerticalLines, SortedAscending, SortedDescending, DataGrid, DataTable } =
  tableStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { tableTemplate } = templates;

      return {
        tableTemplate,
        defaultTable: defaultTable(templates),
        imageOverlayTable: imageOverlayTable(templates),
        sortedAscendingTable: sortedAscendingTable(templates),
        sortedDescendingTable: sortedDescendingTable(templates),
        dataGridTable: dataGridTable(templates, true),
        dataTableTable: dataGridTable(templates),
      };
    },
  });

export { DataGrid, DataTable, Default, SortedAscending, SortedDescending, WithDsoImageOverlay, WithVerticalLines };
