import { storiesOfPagination } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import { templateContainer } from '../../templates';

import readme from './readme.md';

storiesOfPagination(
  {
    module,
    storiesOf,
    readme
  },
  templateContainer,
  ({ paginationTemplate }) => ({ paginationTemplate })
);
