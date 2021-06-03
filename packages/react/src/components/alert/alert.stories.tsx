import { storiesOfAlert } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import { alertTemplate, alertWithHeadingsTemplate } from './alert.template';
import readme from './readme.md';

storiesOfAlert(
  {
    module,
    storiesOf,
    readme
  },
  {
    alertTemplate,
    alertWithHeadingsTemplate
  }
);
