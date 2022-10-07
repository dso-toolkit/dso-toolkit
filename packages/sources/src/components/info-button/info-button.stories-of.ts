import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { InfoButtonArgs, infoButtonArgsMapper, infoButtonArgTypes } from './info-button.args';
import { InfoButton } from './info-button.models';

export interface InfoButtonTemplates<TemplateFnReturnType> {
  infoButtonTemplate: (infoButtonProperties: InfoButton) => TemplateFnReturnType;
}

export const storiesOfInfoButton = storiesOfFactory<InfoButtonTemplates<any>, InfoButtonArgs>('Info Button', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: infoButtonArgTypes
  });

  const template = templateMapper((args, { infoButtonTemplate }) => infoButtonTemplate(infoButtonArgsMapper(args)));

  stories.add(
    'inactive',
    template,
    {
      args: {
        active: false
      }
    }
  );

  stories.add(
    'active',
    template,
    {
      args: {
        active: true
      }
    }
  );

  stories.add(
    'secondary inactive',
    template,
    {
      args: {
        active: false,
        secondary: true
      }
    }
  );

  stories.add(
    'secondary active',
    template,
    {
      args: {
        active: true,
        secondary: true
      }
    }
  );
})

// export function storiesOfInfoButton<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     infoButtonTemplate
//   }: InfoButtonParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Info Button', parameters, infoButtonArgTypes)
//     .addParameters({
//       args: {
//         label: 'Toelichting bij vraag'
//       }
//     });

//   const template = bindTemplate(infoButtonArgsMapper, infoButtonTemplate);


// }
