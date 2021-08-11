import { bindTemplate, StorybookParameters } from '../../stories-helpers';
import { v4 as uuidv4 } from 'uuid';

import { listButtonArgsMapper, listButtonArgTypes } from './list-button.args';
import { ListButton } from './list-button.models';

export interface ListButtonParameters<TemplateFnReturnType> {
  listButtonTemplate: (listButtonProperties: ListButton) => TemplateFnReturnType;
}

export function storiesOfListButton<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    listButtonTemplate: listButtonTemplate
  }: ListButtonParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(listButtonArgsMapper, listButtonTemplate);

  const stories = storiesOf('List Button', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: listButtonArgTypes,
      args: {
        label: 'Milieubelastende activiteit - Melding',
        count: 0,
        inputNumber: {
          id: uuidv4()
        }
      }
    });

  stories.add(
    'List Button',
    template
  );
}
