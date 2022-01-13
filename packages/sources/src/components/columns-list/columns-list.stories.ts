import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { ColumnsListArgs, columnsListArgsMapper, columnsListArgTypes } from './columns-list.args';
import { ColumnsList } from './columns-list.models';

export interface ColumnsListParameters<TemplateFnReturnType> {
  columnsListTemplate: (columnsListProperties: ColumnsList) => TemplateFnReturnType;
}

export function storiesOfColumnsList<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    columnsListTemplate
  }: ColumnsListParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(columnsListArgsMapper, columnsListTemplate);

  const stories = storiesOf('Columns List', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: columnsListArgTypes,
      args: componentArgs<ColumnsListArgs>({
        listItems: [
          'aanbouwen',
          'afvalcontainer',
          'avegaarpaal',
          'berging',
          'bijbehorend bouwwerk',
          'bijkeuken',
          'blokhut',
          'boorpaal',
          'buispaal',
          'buitenkeuken',
          'carport',
          'dierenverblijf',
          'erker',
          'fietsenberging',
          'fietsenhok',
          'fundering',
          'garage'
        ]
      })
    });

    stories.add(
      'default',
      template
    );
}
