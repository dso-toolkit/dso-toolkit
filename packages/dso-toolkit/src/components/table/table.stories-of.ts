import { ComponentAnnotations, Renderer } from "@storybook/types";

import { TableArgs, tableArgsMapper, tableArgTypes } from "./table.args.js";
import { Table, TableContent } from "./table.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type TableStory = StoryObj<TableArgs, Renderer>;

interface TableStories {
  Default: TableStory;
  WithDsoImageOverlay: TableStory;
  WithVerticalLines: TableStory;
  SortedAscending: TableStory;
  SortedDescending: TableStory;
  DataGrid: TableStory;
  DataTable: TableStory;
}

interface TableStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, TableTemplates<TemplateFnReturnType>> {}

export interface TableTemplates<TemplateFnReturnType> {
  tableTemplate: (TableProperties: Table<TemplateFnReturnType>) => TemplateFnReturnType;
  defaultTable: TableContent<TemplateFnReturnType>;
  imageOverlayTable: TableContent<TemplateFnReturnType>;
  sortedAscendingTable: TableContent<TemplateFnReturnType>;
  sortedDescendingTable: TableContent<TemplateFnReturnType>;
  dataGridTable: TableContent<TemplateFnReturnType>;
  dataTableTable: TableContent<TemplateFnReturnType>;
}

export function tableMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  TableArgs
> {
  return {
    argTypes: tableArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function tableStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: TableStoriesParameters<Implementation, Templates, TemplateFnReturnType>): TableStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { tableTemplate, defaultTable }) =>
        tableTemplate(tableArgsMapper(args, defaultTable)),
      ),
    },
    WithDsoImageOverlay: {
      args: {
        noModal: false,
      },
      render: templateContainer.render(storyTemplates, (args, { tableTemplate, imageOverlayTable }) =>
        tableTemplate(tableArgsMapper(args, imageOverlayTable)),
      ),
    },
    WithVerticalLines: {
      args: {
        noModal: false,
        verticalLines: true,
      },
      render: templateContainer.render(storyTemplates, (args, { tableTemplate, imageOverlayTable }) =>
        tableTemplate(tableArgsMapper(args, imageOverlayTable)),
      ),
    },
    SortedAscending: {
      args: {
        noModal: false,
      },
      render: templateContainer.render(storyTemplates, (args, { tableTemplate, sortedAscendingTable }) =>
        tableTemplate(tableArgsMapper(args, sortedAscendingTable)),
      ),
    },
    SortedDescending: {
      args: {
        noModal: false,
      },
      render: templateContainer.render(storyTemplates, (args, { tableTemplate, sortedDescendingTable }) =>
        tableTemplate(tableArgsMapper(args, sortedDescendingTable)),
      ),
    },
    DataGrid: {
      args: {
        noModal: true,
        headingColumns: true,
        role: "grid",
      },
      render: templateContainer.render(storyTemplates, (args, { tableTemplate, dataGridTable }) =>
        tableTemplate(tableArgsMapper(args, dataGridTable)),
      ),
    },
    DataTable: {
      args: { noModal: true, headingColumns: true },
      render: templateContainer.render(storyTemplates, (args, { tableTemplate, dataTableTable }) =>
        tableTemplate(tableArgsMapper(args, dataTableTable)),
      ),
    },
  };
}
