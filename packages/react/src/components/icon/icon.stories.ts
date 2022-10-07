import { storiesOfIcon } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfIcon(
  {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  ({ iconTemplate }) => ({
    iconTemplate
  })
);
