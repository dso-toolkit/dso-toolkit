import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { buttonArgsMapper, buttonArgTypes } from './button.args';
import { Button } from './button.models';

export interface ButtonParameters<TemplateFnReturnType> {
  buttonTemplate: (buttonProperties: Button) => TemplateFnReturnType;
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
      argTypes: buttonArgTypes
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
        modifier: 'primary',
        label: 'Primary button'
      }
    }
  );

  stories.add(
    'secondary (default)',
    template,
    {
      args: {
        modifier: 'default',
        label: 'Secondary button'
      }
    }
  );

  stories.add(
    'tertiary (link)',
    template,
    {
      args: {
        modifier: 'link',
        label: 'Tertiary button'
      }
    }
  );
}
