import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { ButtonArgs, buttonArgsMapper, buttonArgTypes } from './button.args';
import { Button, ButtonAnchor } from './button.models';

export interface ButtonTemplates<TemplateFnReturnType> {
  buttonTemplate: (buttonProperties: Button | ButtonAnchor) => TemplateFnReturnType;
}

export const storiesOfButton = storiesOfFactory<ButtonTemplates<any>, ButtonArgs>('button', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: buttonArgTypes,
      args: {
        element: 'button'
      }
    });

  const template = templateMapper((args, { buttonTemplate }) => buttonTemplate(buttonArgsMapper(args)));

  stories.add(
    'primary',
    template,
    {
      argTypes: {
        iconMode: {
          options: [undefined, 'after']
        }
      },
      args: {
        variant: 'primary',
        label: 'Primary button'
      }
    }
  );

  stories.add(
    'secondary (default)',
    template,
    {
      args: {
        variant: 'secondary',
        label: 'Secondary button'
      }
    }
  );

  stories.add(
    'tertiary (link)',
    template,
    {
      args: {
        variant: 'tertiary',
        label: 'Tertiary button'
      }
    }
  );
});
