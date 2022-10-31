import { storiesOfBadge } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfBadge({
  parameters: {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  storyTemplates: ({ badgeTemplate }) => ({ badgeTemplate })
});
