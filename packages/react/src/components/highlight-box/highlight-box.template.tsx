import { HighlightBox } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoHighlightBox } from '../..';
import { iconTemplate } from '../icon/icon.template';

export function highlightBoxTemplate({ yellow, white, dropShadow, border, step, icon, richContent }: HighlightBox<JSX.Element>) {
  return (
    <DsoHighlightBox
      step={step}
      yellow={yellow}
      white={white}
      dropShadow={dropShadow}
      border={border}
    >
      {icon && iconTemplate({ icon }, 'icon')}
      {richContent}
    </DsoHighlightBox>
  );
}
