import { OzonContent } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoOzonContent } from '../..';

export function ozonContentTemplate({
  content,
  dsoAnchorClick
}: OzonContent) {
  return (
    <DsoOzonContent
      content={content}
      onDsoAnchorClick={dsoAnchorClick}
    ></DsoOzonContent>
  );
}
