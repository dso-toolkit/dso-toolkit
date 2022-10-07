import { storiesOfPagination } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import coreReadme from '@dso-toolkit/core/src/components/pagination/readme.md';
import cssReadme from '@dso-toolkit/css/src/components/pagination/readme.md';

import { StoryRoot } from '@dso-toolkit/sources/src/storybook';
import { templateContainer } from '../../templates';

storiesOfPagination(
  {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss
  },
  templateContainer,
  ({ paginationTemplate }) => ({ paginationTemplate })
);

storiesOfPagination(
  {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core
  },
  templateContainer,
  ({ paginationTemplate }) => ({ paginationTemplate })
);
