import { storiesOfProgressIndicator } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

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
