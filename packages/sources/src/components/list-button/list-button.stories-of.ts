import { bindTemplate, createStories, StorybookParameters } from '../../storybook';
import { v4 as uuidv4 } from 'uuid';

import { listButtonArgsMapper, listButtonArgTypes } from './list-button.args';
import { ListButton } from './list-button.models';

export interface ListButtonParameters<TemplateFnReturnType> {
  listButtonTemplate: (listButtonProperties: ListButton) => TemplateFnReturnType;
}

export function storiesOfListButton<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    listButtonTemplate: listButtonTemplate
  }: ListButtonParameters<TemplateFnReturnType>
) {
  const stories = createStories('List Button', parameters, listButtonArgTypes)
    .addParameters({
      args: {
        label: 'Milieubelastende activiteit - Melding',
        count: 0,
        inputNumber: {
          id: uuidv4()
        }
      }
    });

  const template = bindTemplate(listButtonArgsMapper, listButtonTemplate);

  stories.add(
    'List Button',
    template
  );
}
