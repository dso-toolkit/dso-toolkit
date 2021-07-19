import { storiesOfDropdownButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { dropdownButtonTemplate } from './dropdown-button.template';
import readme from './readme.md';

storiesOfDropdownButton(
  {
    module,
    storiesOf,
    readme
  },
  {
    dropdownButtonTemplate
  }
);
