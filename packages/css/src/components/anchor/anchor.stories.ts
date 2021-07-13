import { storiesOfAnchor } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { anchorTemplate } from './anchor.template';
import readme from './readme.md';

storiesOfAnchor(
  {
    storiesOf,
    module,
    readme
  },
  {
    anchorTemplate
  }
);
