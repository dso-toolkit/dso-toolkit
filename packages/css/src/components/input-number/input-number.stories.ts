import { storiesOfInputNumber } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { inputNumberTemplate } from './input-number.template';
import readme from './readme.md';

storiesOfInputNumber(
  {
    storiesOf,
    module,
    readme
  },
  {
    inputNumberTemplate
  }
);
