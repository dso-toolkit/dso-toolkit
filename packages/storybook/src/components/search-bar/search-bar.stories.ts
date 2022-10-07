import { storiesOfSearchBar } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/search-bar/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfSearchBar(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ searchBarTemplate }) => ({ searchBarTemplate })
);
