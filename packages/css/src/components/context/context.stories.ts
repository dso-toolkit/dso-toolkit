import { storiesOfContext } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { contextTemplate } from './context.template';
import readme from './readme.md';

storiesOfContext(
  {
    storiesOf,
    module,
    readme
  },
  {
    contextTemplate
  }
);
