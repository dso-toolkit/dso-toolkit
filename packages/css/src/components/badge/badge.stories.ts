import { storiesOfBadge } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { badgeTemplate } from './badge.template';
import readme from './readme.md';

storiesOfBadge(
  {
    storiesOf,
    module,
    readme
  },
  {
    badgeTemplate
  }
);
