import { storiesOfPagination } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';

import { paginationTemplate } from './pagination.template';
import readme from './readme.md';

storiesOfPagination(
  {
    module,
    storiesOf,
    readme
  },
  {
    paginationTemplate
  }
);
