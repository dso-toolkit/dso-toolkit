import { storiesOf } from '@storybook/web-components';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { storiesOfBadge } from '@dso-toolkit/sources/src';

import * as css from '@dso-toolkit/css/src/components/badge/badge.template';
import cssReadme from '@dso-toolkit/css/src/components/badge/readme.md';

import * as core from '@dso-toolkit/core/src/components/badge/badge.template';
import coreReadme from '@dso-toolkit/core/src/components/badge/readme.md';

storiesOfBadge(
  {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    badgeTemplate: css.badgeTemplate
  }
);

storiesOfBadge(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    badgeTemplate: core.badgeTemplate
  }
);
