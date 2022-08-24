import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { badgeArgsMapper, badgeArgTypes } from './badge.args';
import { Badge } from './badge.models';

export interface BadgeParameters<TemplateFnReturnType> {
  badgeTemplate: (badgeProperties: Badge) => TemplateFnReturnType;
}

export function storiesOfBadge<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    badgeTemplate
  }: BadgeParameters<TemplateFnReturnType>
) {
  const stories = createStories('Badge', parameters, badgeArgTypes);
  const template = bindTemplate(badgeArgsMapper, badgeTemplate);

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
}
