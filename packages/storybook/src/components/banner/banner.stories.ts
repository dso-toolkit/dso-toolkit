import { storiesOfBanner } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as css from '@dso-toolkit/css/src/components/banner/banner.template';
import cssReadme from '@dso-toolkit/css/src/components/banner/readme.md';

import * as core from '@dso-toolkit/core/src/components/banner/banner.template';
import coreReadme from '@dso-toolkit/core/src/components/banner/readme.md';

import { dangerRichContent, dangerWithHeadingsRichContent, richWarningRichContent, warningRichContent } from './banner.content';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfBanner(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    bannerTemplate: css.bannerTemplate,
    warningRichContent,
    dangerRichContent,
    richWarningRichContent,
    dangerWithHeadingsRichContent
  }
);

storiesOfBanner(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    bannerTemplate: core.bannerTemplate,
    warningRichContent,
    dangerRichContent,
    richWarningRichContent,
    dangerWithHeadingsRichContent
  }
);
