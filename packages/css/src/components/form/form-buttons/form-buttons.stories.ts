import { storiesOfFormButtons } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { formButtonsTemplate } from './form-buttons.template';
import readme from './readme.md';

storiesOfFormButtons(
  {
    module,
    storiesOf,
    readme
  },
  {
    formButtonsTemplate
  }
);
