import { storiesOfPagination } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import * as core from '@dso-toolkit/core/src/components/pagination/pagination.template';
import coreReadme from '@dso-toolkit/core/src/components/pagination/readme.md';

import * as css from '@dso-toolkit/css/src/components/pagination/pagination.template';
import cssReadme from '@dso-toolkit/css/src/components/pagination/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfPagination(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  {
    paginationTemplate: css.paginationTemplate
  }
);

storiesOfPagination(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  {
    paginationTemplate: core.paginationTemplate
  }
);
