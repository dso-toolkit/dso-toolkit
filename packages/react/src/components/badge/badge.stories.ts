import { storiesOfBadge } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfBadge(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ badgeTemplate }) => ({ badgeTemplate })
);
