import { Table } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoTable } from '../..';

export function tableTemplate({ responsive }: Table) {
  return (
    <DsoTable
      responsive={responsive}
    />
  );
}
