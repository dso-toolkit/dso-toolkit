import { Pagination } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoPagination } from '../..';

export function paginationTemplate({ count, current, onSelectPage }: Pagination) {
  return (
    <DsoPagination
      count={count}
      current={current}
      createLink={(page: number) => '#' + page}
      selectPage={onSelectPage}
    />
  );
}
