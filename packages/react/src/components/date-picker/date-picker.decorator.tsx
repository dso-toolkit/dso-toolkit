import { LabelParameters } from '@dso-toolkit/sources';
import * as React from 'react';

export const decorator: LabelParameters<JSX.Element>['decorator'] = (story) => (
  <>
    <div className='narrow-input'>
      {story()}
    </div>

    <style>
      .narrow-input {'{'}
        width: 175px;
      {'}'}
    </style>
  </>
);
