import { InfoButton } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoInfoButton } from '../..';

export function infoButtonTemplate({ label, active, secondary, onToggle }: InfoButton) {
  return (
    <DsoInfoButton
      label={label}
      active={active}
      secondary={secondary}
      onDsoToggle={(e: CustomEvent) => onToggle(e.detail)}
    ></DsoInfoButton>
  );
}
