import { storiesOfOzonContent } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

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
