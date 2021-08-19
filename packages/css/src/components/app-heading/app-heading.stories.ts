import { storiesOfApplicationHeader } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { applicationHeaderTemplate } from './app-heading.template';
import readme from './readme.md';

storiesOfApplicationHeader(
  {
    module,
    storiesOf,
    readme
  },
  {
    applicationHeaderTemplate
  }
);
