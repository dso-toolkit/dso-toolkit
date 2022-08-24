import { storiesOfCard } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { cardTemplate } from '@dso-toolkit/css/src/components/card/card.template';
import readme from '@dso-toolkit/css/src/components/card/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfCard(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    cardTemplate
  }
);
