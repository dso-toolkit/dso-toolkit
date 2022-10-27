import { Tooltip } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoTooltip } from '../..';
import { ComponentImplementation } from '../../templates';

export const reactTooltip: ComponentImplementation<Tooltip> = {
  component: 'tooltip',
  implementation: 'react',
  template: () => function tooltipTemplate({ position, label, id }) {
    return (
      <DsoTooltip position={position} for={id}>
        {label}
      </DsoTooltip>
    );
  }
};
