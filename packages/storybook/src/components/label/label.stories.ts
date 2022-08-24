import { storiesOfLabel } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/label/label.template';
import cssReadme from '@dso-toolkit/css/src/components/label/readme.md';

import * as core from '@dso-toolkit/core/src/components/label/label.template';
import coreReadme from '@dso-toolkit/core/src/components/label/readme.md';

import { decorator } from './label.decorator';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfLabel(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    labelTemplate: css.labelTemplate,
    decorator
  }
);

storiesOfLabel(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    labelTemplate: core.labelTemplate,
    decorator
  }
);
