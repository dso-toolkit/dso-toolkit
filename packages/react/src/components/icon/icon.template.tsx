import { Icon } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoIcon } from '../..';

export function iconTemplate({ icon }: Icon, slot?: string) {
  return (
    <DsoIcon
      icon={icon}
      slot={slot}
    ></DsoIcon>
  );
}
