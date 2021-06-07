import { storiesOfProgressBar } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { progressBarTemplate } from './progress-bar.template';
import readme from './readme.md';

storiesOfProgressBar(
  {
    module,
    storiesOf,
    readme
  },
  {
    progressBarTemplate
  }
);
