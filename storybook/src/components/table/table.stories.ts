import readme from "@dso-toolkit/core/src/components/table/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { TableArgs, tableArgTypes, tableArgsMapper } from "./table.args.js";
import {
  dataGridTable,
  defaultTable,
  imageOverlayTable,
  sortedAscendingTable,
  sortedDescendingTable,
} from "./table.content.js";
import { tableTemplate } from "./table.template.js";

type TableStory = StoryObj<TableArgs, Renderer>;

const meta: Meta<TableArgs> = {
  title: "Core/Table",
  argTypes: tableArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: TableStory = {
  render: (args) => tableTemplate(tableArgsMapper(args, defaultTable())),
};

export const WithDsoImageOverlay: TableStory = {
  args: {
    noModal: false,
  },
  render: (args) => tableTemplate(tableArgsMapper(args, imageOverlayTable())),
};

export const WithVerticalLines: TableStory = {
  args: {
    noModal: false,
    verticalLines: true,
  },
  render: (args) => tableTemplate(tableArgsMapper(args, imageOverlayTable())),
};

export const SortedAscending: TableStory = {
  args: {
    noModal: false,
  },
  render: (args) => tableTemplate(tableArgsMapper(args, sortedAscendingTable())),
};

export const SortedDescending: TableStory = {
  args: {
    noModal: false,
  },
  render: (args) => tableTemplate(tableArgsMapper(args, sortedDescendingTable())),
};

export const DataGrid: TableStory = {
  args: {
    noModal: true,
    headingColumns: true,
    role: "grid",
  },
  render: (args) => tableTemplate(tableArgsMapper(args, dataGridTable(true))),
};

export const DataTable: TableStory = {
  args: {
    noModal: true,
    headingColumns: true,
  },
  render: (args) => tableTemplate(tableArgsMapper(args, dataGridTable())),
};
