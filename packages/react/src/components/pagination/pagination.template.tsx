import { Pagination } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoPagination } from '../..';

export function paginationTemplate({ totalPages, currentPage, onSelectPage, formatHref }: Pagination) {
  return (
    <DsoPagination
      totalPages={totalPages}
      currentPage={currentPage}
      formatHref={formatHref}
      selectPage={onSelectPage}
    />
  );
}
