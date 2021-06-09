import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { iconArgsMapper, iconArgTypes } from './icon.args';
import { Icon } from './icon.models';

export interface IconParameters<TemplateFnReturnType> {
  iconTemplate: (iconProperties: Icon) => TemplateFnReturnType;
}

export function storiesOfIcon<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    iconTemplate
  }: IconParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(iconArgsMapper, iconTemplate);

  const stories = storiesOf('Icon', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: iconArgTypes,
      args: {
        icon: 'user'
      }
    });

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
