import { storiesOfTable } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfTable(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ tableTemplate }) => ({ tableTemplate })
);
