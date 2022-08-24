import { storiesOfInfoButton } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/info-button/info-button.template';
import cssReadme from '@dso-toolkit/css/src/components/info-button/readme.md';

import * as core from '@dso-toolkit/core/src/components/info-button/info-button.template';
import coreReadme from '@dso-toolkit/core/src/components/info-button/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfInfoButton(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    infoButtonTemplate: css.infoButtonTemplate
  }
);

storiesOfInfoButton(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    infoButtonTemplate: core.infoButtonTemplate
  }
);
