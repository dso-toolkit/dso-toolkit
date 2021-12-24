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
          { listItem: 'aanbouwen'},
          { listItem: 'afvalcontainer'},
          { listItem: 'avegaarpaal'},
          { listItem: 'berging'},
          { listItem: 'bijbehorend bouwwerk'},
          { listItem: 'bijkeuken'},
          { listItem: 'blokhut'},
          { listItem: 'boorpaal'},
          { listItem: 'buispaal'},
          { listItem: 'buitenkeuken'},
          { listItem: 'carport'},
          { listItem: 'dierenverblijf'},
          { listItem: 'erker'},
          { listItem: 'fietsenberging'},
          { listItem: 'fietsenhok'},
          { listItem: 'fundering'},
          { listItem: 'garage'}
        ]
      })
    });

    stories.add(
      'default',
      template
    );
}
