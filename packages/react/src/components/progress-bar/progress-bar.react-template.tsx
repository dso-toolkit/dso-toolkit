import { ProgressBar } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoProgressBar } from '../..';
import { ComponentImplementation } from '../../templates';

export const reactProgressBar: ComponentImplementation<ProgressBar> = {
  component: 'progressBar',
  implementation: 'react',
  template: () => function progressBarTemplate({ progress, label, min, max }) {
    return (
      <DsoProgressBar
        progress={progress}
        min={min}
        max={max}
      >{label ?? ''}</DsoProgressBar>
    );
  }
};
