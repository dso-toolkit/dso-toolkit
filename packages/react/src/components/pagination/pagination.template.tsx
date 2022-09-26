import { Pagination } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoPagination } from '../..';

export function paginationTemplate({ totalPages, currentPage, dsoSelectPage, formatHref }: Pagination) {
  return (
    <DsoPagination
      totalPages={totalPages}
      currentPage={currentPage}
      formatHref={formatHref}
      onDsoSelectPage={dsoSelectPage}
    />
  );
}
