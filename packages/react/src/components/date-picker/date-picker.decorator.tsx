import { DatePickerParameters } from '@dso-toolkit/sources';
import * as React from 'react';

export const decorator: DatePickerParameters<JSX.Element>['decorator'] = (story) => (
  <div style={({ width: '175px' })}>
    {story()}
  </div>
);
