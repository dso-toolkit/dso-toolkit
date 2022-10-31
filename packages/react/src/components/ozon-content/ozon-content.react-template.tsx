import { OzonContent } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoOzonContent } from '../..';
import { ComponentImplementation } from '../../templates';

export const reactOzonContent: ComponentImplementation<OzonContent> = {
  component: 'ozonContent',
  implementation: 'react',
  template: () => function ozonContentTemplate({
    content,
    dsoAnchorClick
  }) {
    return (
      <DsoOzonContent
        content={content}
        onDsoAnchorClick={dsoAnchorClick}
      ></DsoOzonContent>
    );
  }
};
