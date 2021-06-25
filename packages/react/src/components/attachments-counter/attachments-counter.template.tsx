import { AttachmentsCounter } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoAttachmentsCounter } from '../..';

export function attachmentsCounterTemplate({ count }: AttachmentsCounter) {
  return (
    <DsoAttachmentsCounter count={count}></DsoAttachmentsCounter>
  );
}
