import { storiesOfBanner } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfBanner(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ bannerTemplate }) => ({ bannerTemplate })
);
