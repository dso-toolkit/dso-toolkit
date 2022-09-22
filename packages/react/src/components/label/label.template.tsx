import { Label } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoLabel } from '../..';

export function labelTemplate({ status, label, removable, onRemoveLabel, compact, truncate, symbol }: Label) {
  return (
    <DsoLabel
      status={status}
      onRemoveClick={onRemoveLabel}
      compact={compact}
      truncate={truncate}
      removable={removable}
    >
      {symbol && (
        <span slot="symbol" dangerouslySetInnerHTML={{ __html: symbol }} />
      )}
      {label}
    </DsoLabel>
  );
}
