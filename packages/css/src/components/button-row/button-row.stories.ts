import { storiesOfButtonRow } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { buttonRowTemplate } from './button-row.template';
import readme from './readme.md';

storiesOfButtonRow(
  {
    module,
    storiesOf,
    readme
  },
  {
    buttonRowTemplate
  }
);
