import { Info } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoInfo } from '../..';

export function infoTemplate({ fixed, active, richContent, onClose }: Info<JSX.Element>) {
  return (
    <DsoInfo
      fixed={fixed}
      active={active}
      onDsoClose={onClose}
    >
      {richContent}
    </DsoInfo>
  );
}
