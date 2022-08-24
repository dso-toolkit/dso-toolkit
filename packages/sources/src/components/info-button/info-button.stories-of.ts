import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { infoButtonArgsMapper, infoButtonArgTypes } from './info-button.args';
import { InfoButton } from './info-button.models';

export interface InfoButtonParameters<TemplateFnReturnType> {
  infoButtonTemplate: (infoButtonProperties: InfoButton) => TemplateFnReturnType;
}

export function storiesOfInfoButton<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    infoButtonTemplate
  }: InfoButtonParameters<TemplateFnReturnType>
) {
  const stories = createStories('Info Button', parameters, infoButtonArgTypes)
    .addParameters({
      args: {
        label: 'Toelichting bij vraag'
      }
    });

  const template = bindTemplate(infoButtonArgsMapper, infoButtonTemplate);

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
