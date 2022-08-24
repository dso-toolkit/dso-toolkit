import { storiesOfProgressBar } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/progress-bar/progress-bar.template';
import cssReadme from '@dso-toolkit/css/src/components/progress-bar/readme.md';

import * as core from '@dso-toolkit/core/src/components/progress-bar/progress-bar.template';
import coreReadme from '@dso-toolkit/core/src/components/progress-bar/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfProgressBar(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    progressBarTemplate: css.progressBarTemplate
  }
);

storiesOfProgressBar(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    progressBarTemplate: core.progressBarTemplate
  }
);
