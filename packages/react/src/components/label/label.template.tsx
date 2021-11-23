import { Label } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoLabel } from '../..';

export function labelTemplate({ status, label, button, compact, symbol }: Label) {
  return (
    <DsoLabel
      status={status}
      removeClick={button?.onClick}
      compact={compact}
      removable={button}
    >
      {symbol && (
        <span slot="symbol" dangerouslySetInnerHTML={{ __html: symbol }} />
      )}
      {label}
    </DsoLabel>
  );
}
