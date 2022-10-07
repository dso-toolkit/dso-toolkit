import { bindTemplate, createStories, StorybookParameters } from '../../storybook';
import { tableArgsMapper, tableArgTypes } from './table.args';
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
    template
  );
}
