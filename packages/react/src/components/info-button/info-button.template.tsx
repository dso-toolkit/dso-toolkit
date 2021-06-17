import { InfoButton } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoInfoButton } from '../..';

export function infoButtonTemplate({ label, active, onClick }: InfoButton) {
  return (
    <DsoInfoButton
      label={label}
      active={active}
      toggle={(e: CustomEvent) => onClick(e.detail)}
    ></DsoInfoButton>
  );
}
