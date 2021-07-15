import { storiesOfProgressIndicator } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { progressIndicatorTemplate } from './progress-indicator.template';
import readme from './readme.md';

storiesOfProgressIndicator(
  {
    module,
    storiesOf,
    readme
  },
  {
    progressIndicatorTemplate
  }
);
