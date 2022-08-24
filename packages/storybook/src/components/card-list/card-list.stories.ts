import { storiesOfCardList } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { cardListTemplate } from '@dso-toolkit/css/src/components/card-list/card-list.template';
import readme from '@dso-toolkit/css/src/components/card-list/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfCardList(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    cardListTemplate
  }
);
