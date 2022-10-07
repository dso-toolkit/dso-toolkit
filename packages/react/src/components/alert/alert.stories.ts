import { storiesOfAlert } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfAlert(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ alertTemplate }) => ({ alertTemplate })
);
