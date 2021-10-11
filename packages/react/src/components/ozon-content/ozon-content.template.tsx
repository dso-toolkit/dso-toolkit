import { OzonContent } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoOzonContent } from '../..';

export function ozonContentTemplate({
  content,
  onAnchorClick
}: OzonContent) {
  return (
    <DsoOzonContent
      content={content}
      onAnchorClick={onAnchorClick}
    ></DsoOzonContent>
  );
}
