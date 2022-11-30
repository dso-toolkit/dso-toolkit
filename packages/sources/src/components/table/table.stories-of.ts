import { Parameters } from "@storybook/addons";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { TableArgs, tableArgsMapper, tableArgTypes } from "./table.args";
import { Table, TableContent } from "./table.models";

export interface TableTemplates<TemplateFnReturnType> {
  tableTemplate: (TableProperties: Table<TemplateFnReturnType>) => TemplateFnReturnType;
  defaultTable: TableContent<TemplateFnReturnType>;
  imageOverlayTable: TableContent<TemplateFnReturnType>;
}

export function storiesOfTable<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TableTemplates<TemplateFnReturnType>
  >,
  parameters?: Parameters
) {
  return storiesOfFactory("Table", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: tableArgTypes,
      ...parameters,
    });

    stories.add(
      "default",
      templateMapper<TableArgs>((args, { tableTemplate, defaultTable }) =>
        tableTemplate(tableArgsMapper(args, defaultTable))
      ),
      {
        args: {
          noModal: false,
        },
      }
    );

    stories.add(
      "with dso-image-overlay",
      templateMapper<TableArgs>((args, { tableTemplate, imageOverlayTable }) =>
        tableTemplate(tableArgsMapper(args, imageOverlayTable))
      ),
      {
        args: {
          noModal: false,
        },
      }
    );

    stories.add(
      "with vertical lines",
      templateMapper<TableArgs>((args, { tableTemplate, imageOverlayTable }) =>
        tableTemplate(tableArgsMapper(args, imageOverlayTable))
      ),
      {
        args: {
          noModal: false,
          verticalLines: true,
        },
      }
    );

    return stories;
  });
}
