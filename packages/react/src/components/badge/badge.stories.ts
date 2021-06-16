import { storiesOfBadge } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { badgeTemplate } from './badge.template';
import readme from './readme.md';

storiesOfBadge(
  {
    module,
    storiesOf,
    readme
  },
  {
    badgeTemplate
  }
);
