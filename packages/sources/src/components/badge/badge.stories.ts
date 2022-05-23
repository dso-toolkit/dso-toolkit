import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { badgeArgsMapper, badgeArgTypes } from './badge.args';
import { Badge } from './badge.models';

export interface BadgeParameters<TemplateFnReturnType> {
  badgeTemplate: (badgeProperties: Badge) => TemplateFnReturnType;
}

export function storiesOfBadge<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    badgeTemplate
  }: BadgeParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(badgeArgsMapper, badgeTemplate);

  const stories = storiesOf('Badge', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: badgeArgTypes
    });

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
