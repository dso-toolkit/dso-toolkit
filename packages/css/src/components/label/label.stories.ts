import { storiesOfLabel } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { labelTemplate } from './label.template';
import readme from './readme.md';

storiesOfLabel(
  {
    module,
    storiesOf,
    readme
  },
  {
    labelTemplate
  }
);
