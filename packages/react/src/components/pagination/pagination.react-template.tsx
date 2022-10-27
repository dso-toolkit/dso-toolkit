import { Pagination } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoPagination } from '../..';
import { ComponentImplementation } from '../../templates';

export const reactPagination: ComponentImplementation<Pagination> = {
  component: 'pagination',
  implementation: 'react',
  template: () => function paginationTemplate({ totalPages, currentPage, dsoSelectPage, formatHref }) {
    return (
      <DsoPagination
        totalPages={totalPages}
        currentPage={currentPage}
        formatHref={formatHref}
        onDsoSelectPage={dsoSelectPage}
      />
    );
  }
};
