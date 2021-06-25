import { ProgressBar } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoProgressBar } from '../..';

export function progressBarTemplate({ progress, label, min, max }: ProgressBar) {
  return (
    <DsoProgressBar
      progress={progress}
      min={min}
      max={max}
    >{label ?? ''}</DsoProgressBar>
  );
}
