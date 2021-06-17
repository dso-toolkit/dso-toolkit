import { storiesOfLabel } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';

import * as React from 'react';

import { labelTemplate } from './label.template';
import readme from './readme.md';

storiesOfLabel(
  {
    module,
    storiesOf,
    readme
  },
  {
    labelTemplate
  }
);
