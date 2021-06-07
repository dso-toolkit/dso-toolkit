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
  const stories = storiesOf('Badge', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: badgeArgTypes
    });

  stories.add(
    'plain',
    bindTemplate(badgeArgsMapper, badgeTemplate),
    {
      args: {
        message: 'Plain'
      }
    }
  );

  stories.add(
    'primary',
    bindTemplate(badgeArgsMapper, badgeTemplate),
    {
      args: {
        status: 'primary',
        message: 'Primary'
      }
    }
  );

  stories.add(
    'success',
    bindTemplate(badgeArgsMapper, badgeTemplate),
    {
      args: {
        status: 'success',
        message: 'Success'
      }
    }
  );

  stories.add(
    'info',
    bindTemplate(badgeArgsMapper, badgeTemplate),
    {
      args: {
        status: 'info',
        message: 'Info'
      }
    }
  );

  stories.add(
    'warning',
    bindTemplate(badgeArgsMapper, badgeTemplate),
    {
      args: {
        status: 'warning',
        message: 'Warning'
      }
    }
  );

  stories.add(
    'danger',
    bindTemplate(badgeArgsMapper, badgeTemplate),
    {
      args: {
        status: 'danger',
        message: 'Danger'
      }
    }
  );
}
