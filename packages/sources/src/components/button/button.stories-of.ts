import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { buttonArgsMapper, buttonArgTypes } from './button.args';
import { Button, ButtonAnchor } from './button.models';

export interface ButtonParameters<TemplateFnReturnType> {
  buttonTemplate: (buttonProperties: Button | ButtonAnchor) => TemplateFnReturnType;
}

export function storiesOfButton<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    buttonTemplate
  }: ButtonParameters<TemplateFnReturnType>
) {
  const stories = createStories('Button', parameters, buttonArgTypes)
    .addParameters({
      args: {
        element: 'button'
      }
    });

  const template = bindTemplate(buttonArgsMapper, buttonTemplate);

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
}
