import { storiesOfInfo } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/info/info.template';
import cssReadme from '@dso-toolkit/css/src/components/info/readme.md';

import * as core from '@dso-toolkit/core/src/components/info/info.template';
import coreReadme from '@dso-toolkit/core/src/components/info/readme.md';

import { richContent } from './info.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfInfo(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    infoTemplate: css.infoTemplate,
    richContent
  }
);

storiesOfInfo(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    infoTemplate: core.infoTemplate,
    richContent
  }
);
