import { storiesOfProgressIndicator } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import cssReadme from '@dso-toolkit/css/src/components/progress-indicator/readme.md';
import coreReadme from '@dso-toolkit/core/src/components/progress-indicator/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfProgressIndicator(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ progressIndicatorTemplate }) => ({ progressIndicatorTemplate })
  // {
  //   progressIndicatorTemplate: css.progressIndicatorTemplate
  // }
);

storiesOfProgressIndicator(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ progressIndicatorTemplate }) => ({ progressIndicatorTemplate })
  // {
  //   progressIndicatorTemplate: core.progressIndicatorTemplate
  // }
);
