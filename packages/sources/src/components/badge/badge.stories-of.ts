import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { BadgeArgs, badgeArgsMapper, badgeArgTypes } from './badge.args';
import { Badge } from './badge.models';

export interface BadgeTemplates<TemplateFnReturnType> {
  badgeTemplate: (badgeProperties: Badge) => TemplateFnReturnType;
}

export const storiesOfBadge = storiesOfFactory<BadgeTemplates<any>, BadgeArgs>('Badge', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: badgeArgTypes
    });

  const template = templateMapper((args, { badgeTemplate }) => badgeTemplate(badgeArgsMapper(args)));

  stories.add(
    'plain',
    template,
    {
      args: {
        message: 'Plain'
      }
    }
  );

  stories.add(
    'primary',
    template,
    {
      args: {
        status: 'primary',
        message: 'Primary'
      }
    }
  );

  stories.add(
    'success',
    template,
    {
      args: {
        status: 'success',
        message: 'Success'
      }
    }
  );

  stories.add(
    'info',
    template,
    {
      args: {
        status: 'info',
        message: 'Info'
      }
    }
  );

  stories.add(
    'warning',
    template,
    {
      args: {
        status: 'warning',
        message: 'Warning'
      }
    }
  );

  stories.add(
    'danger',
    template,
    {
      args: {
        status: 'danger',
        message: 'Danger'
      }
    }
  );

  stories.add(
    'outline',
    template,
    {
      args: {
        status: 'outline',
        message: 'Outline'
      }
    }
  );
})

// export function storiesOfBadge<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     badgeTemplate
//   }: BadgeParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Badge', parameters, badgeArgTypes);
//   const template = bindTemplate(badgeArgsMapper, badgeTemplate);


// }
