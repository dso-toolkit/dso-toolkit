import { v4 as uuidv4 } from 'uuid';

import { ListButtonArgs, listButtonArgsMapper, listButtonArgTypes } from './list-button.args';
import { ListButton } from './list-button.models';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

export interface ListButtonTemplates<TemplateFnReturnType> {
  listButtonTemplate: (listButtonProperties: ListButton) => TemplateFnReturnType;
}

export const storiesOfListButton = storiesOfFactory<ListButtonTemplates<any>, ListButtonArgs>('List Button', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: listButtonArgTypes,
    args: {
      label: 'Milieubelastende activiteit - Melding',
      count: 0,
      inputNumber: {
        id: uuidv4()
      }
    }
  });

  const template = templateMapper((args, { listButtonTemplate }) => listButtonTemplate(listButtonArgsMapper(args)));

  stories.add(
    'List Button',
    template
  );
})

// export function storiesOfListButton<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     listButtonTemplate: listButtonTemplate
//   }: ListButtonParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('List Button', parameters, listButtonArgTypes)
//     .addParameters({
//       args: {
//         label: 'Milieubelastende activiteit - Melding',
//         count: 0,
//         inputNumber: {
//           id: uuidv4()
//         }
//       }
//     });

//   const template = bindTemplate(listButtonArgsMapper, listButtonTemplate);


// }
