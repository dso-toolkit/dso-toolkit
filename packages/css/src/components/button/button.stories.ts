import { storiesOfButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { buttonTemplate } from './button.template';
import readme from './readme.md';

storiesOfButton(
  {
    storiesOf,
    module,
    readme
  },
  {
    buttonTemplate
  }
);
