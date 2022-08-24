import { storiesOfSearchBar } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { searchBarTemplate } from '@dso-toolkit/css/src/components/search-bar/search-bar.template';
import readme from '@dso-toolkit/css/src/components/search-bar/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfSearchBar(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    searchBarTemplate
  }
);
