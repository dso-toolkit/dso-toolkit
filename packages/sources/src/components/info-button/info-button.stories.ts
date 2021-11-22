import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { infoButtonArgsMapper, infoButtonArgTypes } from './info-button.args';
import { InfoButton } from './info-button.models';

export interface InfoButtonParameters<TemplateFnReturnType> {
  infoButtonTemplate: (infoButtonProperties: InfoButton) => TemplateFnReturnType;
}

export function storiesOfInfoButton<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    infoButtonTemplate
  }: InfoButtonParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(infoButtonArgsMapper, infoButtonTemplate);

  const stories = storiesOf('Info Button', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: infoButtonArgTypes,
      args: {
        label: 'Toelichting bij vraag'
      }
    });

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
}
