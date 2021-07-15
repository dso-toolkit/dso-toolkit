import { ProgressIndicator } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoProgressIndicator } from '../..';

export function progressIndicatorTemplate({ status, block, size }: ProgressIndicator) {
  console.log(status, block, size);
  
  return (
    <DsoProgressIndicator
      status={status}
      block={block || undefined}
      size={size}
    />
  );
}
