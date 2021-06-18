import { Info } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoInfo } from '../..';
import { iconTemplate } from '../icon/icon.template';

export function infoTemplate({ fixed, active, richContent, onClose }: Info<JSX.Element>) {
  return (
    <DsoInfo
      fixed={fixed}
      active={active}
      close={onClose}
    >
      {richContent}
    </DsoInfo>
  );
}
