import { Tooltip } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoTooltip } from '../..';

export function tooltipTemplate({ position, label, id }: Tooltip) {
  return (
    <DsoTooltip position={position} for={id}>
      {label}
    </DsoTooltip>
  );
}
