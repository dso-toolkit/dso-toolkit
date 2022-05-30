import { storiesOfSearchBar } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { searchBarTemplate } from './search-bar.template';
import readme from './readme.md';

storiesOfSearchBar(
  {
    module,
    storiesOf,
    readme
  },
  {
    searchBarTemplate
  }
);
