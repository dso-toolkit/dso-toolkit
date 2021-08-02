import { ProgressIndicator } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoProgressIndicator } from '../..';

export function progressIndicatorTemplate({ label: label, block, size }: ProgressIndicator) {
  console.log(label, block, size);

  return (
    <DsoProgressIndicator
      label={label}
      block={block || undefined}
      size={size}
    />
  );
}
