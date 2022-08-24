import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { iconArgsMapper, iconArgTypes } from './icon.args';
import { Icon } from './icon.models';

export interface IconParameters<TemplateFnReturnType> {
  iconTemplate: (iconProperties: Icon) => TemplateFnReturnType;
}

export function storiesOfIcon<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    iconTemplate
  }: IconParameters<TemplateFnReturnType>
) {
  const stories = createStories('Icon', parameters, iconArgTypes)
    .addParameters({
      args: {
        icon: 'user'
      }
    });

  const template = bindTemplate(iconArgsMapper, iconTemplate);

  stories.add(
    'Icon',
    template,
    {
      args: {
        icon: 'user'
      }
    }
  );
}
