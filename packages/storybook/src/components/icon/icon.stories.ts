import { storiesOfIcon } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as core from '@dso-toolkit/core/src/components/icon/icon.template';
import coreReadme from '@dso-toolkit/core/src/components/icon/readme.md';

import * as css from '@dso-toolkit/css/src/components/icon/icon.template';
import cssReadme from '@dso-toolkit/css/src/components/icon/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfIcon(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    iconTemplate: css.iconTemplate
  }
);

storiesOfIcon(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    iconTemplate: core.iconTemplate
  }
);
