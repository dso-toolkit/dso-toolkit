import { storiesOfBreadcrumbs } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { breadcrumbsTemplate } from '@dso-toolkit/css/src/components/breadcrumbs/breadcrumbs.template';
import readme from '@dso-toolkit/css/src/components/breadcrumbs/readme.md';
import { StoryRoot } from '@dso-toolkit/sources/src/storybook';

storiesOfBreadcrumbs(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss
  },
  {
    breadcrumbsTemplate
  }
);
