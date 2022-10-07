import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { IconArgs, iconArgsMapper, iconArgTypes } from './icon.args';
import { Icon } from './icon.models';

export interface IconTemplates<TemplateFnReturnType> {
  iconTemplate: (iconProperties: Icon) => TemplateFnReturnType;
}

export const storiesOfIcon = storiesOfFactory<IconTemplates<any>, IconArgs>('Icon', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: iconArgTypes,
    args: {
      icon: 'user'
    }
  });

  const template = templateMapper((args, { iconTemplate }) => iconTemplate(iconArgsMapper(args)));

  stories.add(
    'Icon',
    template,
    {
      args: {
        icon: 'user'
      }
    }
  );
});
