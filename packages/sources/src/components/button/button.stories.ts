import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { buttonArgsMapper, buttonArgTypes } from './button.args';
import { Button, ButtonAnchor } from './button.models';

export interface ButtonParameters<TemplateFnReturnType> {
  buttonTemplate: (buttonProperties: Button | ButtonAnchor) => TemplateFnReturnType;
}

export function storiesOfButton<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    buttonTemplate
  }: ButtonParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(buttonArgsMapper, buttonTemplate);

  const stories = storiesOf('Button', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: buttonArgTypes,
      args: {
        element: 'button'
      }
    });

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
