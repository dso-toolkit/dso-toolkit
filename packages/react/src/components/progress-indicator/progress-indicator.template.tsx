import { ProgressIndicator } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoProgressIndicator } from '../..';

export function progressIndicatorTemplate({ label, block, size }: ProgressIndicator) {
  return (
    <DsoProgressIndicator
      label={label}
      block={block || undefined}
      size={size}
    />
  );
}
