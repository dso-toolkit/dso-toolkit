import { storiesOfProgressIndicator } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/progress-indicator/progress-indicator.template';
import cssReadme from '@dso-toolkit/css/src/components/progress-indicator/readme.md';

import * as core from '@dso-toolkit/core/src/components/progress-indicator/progress-indicator.template';
import coreReadme from '@dso-toolkit/core/src/components/progress-indicator/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfProgressIndicator(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    progressIndicatorTemplate: css.progressIndicatorTemplate
  }
);

storiesOfProgressIndicator(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    progressIndicatorTemplate: core.progressIndicatorTemplate
  }
);
