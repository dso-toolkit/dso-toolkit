import { storiesOfBanner } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfBanner({
  parameters: {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  storyTemplates: ({ bannerTemplate }) => ({ bannerTemplate })
});
