import { storiesOfIcon } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { iconTemplate } from './icon.template';
import readme from './readme.md';

storiesOfIcon(
  {
    module,
    storiesOf,
    readme,
  },
  {
    iconTemplate
  }
);
