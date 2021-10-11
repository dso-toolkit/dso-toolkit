import { storiesOfOzonContent } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { ozonContentTemplate } from './ozon-content.template';
import readme from './readme.md';

storiesOfOzonContent(
  {
    module,
    storiesOf,
    readme
  },
  {
    ozonContentTemplate
  }
);
