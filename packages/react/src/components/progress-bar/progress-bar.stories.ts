import { storiesOfProgressBar } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfProgressBar(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ progressBarTemplate }) => ({ progressBarTemplate })
);
