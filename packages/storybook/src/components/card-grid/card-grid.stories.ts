import { storiesOfCardGrid } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { cardGridTemplate } from '@dso-toolkit/css/src/components/card-grid/card-grid.template';
import readme from '@dso-toolkit/css/src/components/card-grid/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfCardGrid(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    cardGridTemplate
  }
);
