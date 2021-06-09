import { storiesOfBreadcrumbs } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { breadcrumbsTemplate } from './breadcrumbs.template';
import readme from './readme.md';

storiesOfBreadcrumbs(
  {
    module,
    storiesOf,
    readme
  },
  {
    breadcrumbsTemplate
  }
);
