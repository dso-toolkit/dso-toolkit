import { bindTemplate, createStories, StorybookParameters } from '../../storybook';
import { tableArgsMapper, tableArgTypes } from './table.args';
import { defaultTable, imageOverlayTable } from './table.content';
import { Table } from './table.models';

export interface TableParameters<TemplateFnReturnType> {
  tableTemplate: (TableProperties: Table) => TemplateFnReturnType;
}

export function storiesOfTable<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    tableTemplate
  }: TableParameters<TemplateFnReturnType>
) {
  const stories = createStories('Table', parameters, tableArgTypes)
    .addParameters({
    });

  const template = bindTemplate(tableArgsMapper, tableTemplate);

  stories.add(
    'default',
    template,
    {
      args: {
        modal: false,
        responsive: false,
        content: defaultTable,
      }
    }
  );

  stories.add(
    'with dso-image-overlay',
    template,
    {
      args: {
        modal: false,
        responsive: false,
        content: imageOverlayTable,
      }
    }
  );
}
