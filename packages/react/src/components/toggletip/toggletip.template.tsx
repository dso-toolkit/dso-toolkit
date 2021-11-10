import { Toggletip } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoToggletip } from '../..';

export function toggletipTemplate({ children, label, position, small }: Toggletip) {
  return (
    <DsoToggletip label={label} position={position} small={small} dangerouslySetInnerHTML={{__html: children}}>
    </DsoToggletip>
  );
}
