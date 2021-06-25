import { Badge } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoBadge } from '../..';

export function badgeTemplate({ status, message }: Badge) {
  return (
    <DsoBadge
      status={status}
    >
      {message}
    </DsoBadge>
  );
}
