import { storiesOfWhitebox } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { whiteboxTemplate } from './whitebox.template';
import readme from './readme.md';

storiesOfWhitebox(
  {
    module,
    storiesOf,
    readme
  },
  {
    whiteboxTemplate
  }
);
