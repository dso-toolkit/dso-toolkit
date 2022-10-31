import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { TableArgs, tableArgsMapper, tableArgTypes } from "./table.args";
import { defaultTable, imageOverlayTable } from "./table.content";
import { Table } from "./table.models";

export interface TableTemplates<TemplateFnReturnType> {
  tableTemplate: (TableProperties: Table) => TemplateFnReturnType;
}

export function storiesOfTable<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TableTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Table", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: tableArgTypes,
    });

    const template = templateMapper<TableArgs>((args, { tableTemplate }) => tableTemplate(tableArgsMapper(args)));

    stories.add("default", template, {
      args: {
        noModal: false,
        content: defaultTable,
      },
    });

    stories.add("with dso-image-overlay", template, {
      args: {
        noModal: false,
        content: imageOverlayTable,
      },
    });
  });
}
