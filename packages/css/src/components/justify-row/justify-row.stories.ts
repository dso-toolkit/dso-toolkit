import { storiesOfJustifyRow } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { justifyRowTemplate } from './justify-row.template';
import readme from './readme.md';

storiesOfJustifyRow(
  {
    storiesOf,
    module,
    readme
  },
  {
    justifyRowTemplate
  }
);
