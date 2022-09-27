import { Info } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoInfo } from '../..';

export function infoTemplate({ fixed, active, richContent, dsoClose }: Info<JSX.Element>) {
  return (
    <DsoInfo
      fixed={fixed}
      active={active}
      onDsoClose={dsoClose}
    >
      {richContent}
    </DsoInfo>
  );
}
