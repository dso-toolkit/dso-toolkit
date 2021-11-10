import { storiesOfToggletip } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import readme from './readme.md';
import { toggletipTemplate } from './toggletip.template';

storiesOfToggletip(
  {
    module,
    storiesOf,
    readme,
  },
  {
    toggletipTemplate,
  }
);
