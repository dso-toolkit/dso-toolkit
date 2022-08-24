import { storiesOfTile } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components'

import { tileTemplate } from '@dso-toolkit/css/src/components/tile/tile.template';
import readme from '@dso-toolkit/css/src/components/tile/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfTile(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    tileTemplate
  }
);
