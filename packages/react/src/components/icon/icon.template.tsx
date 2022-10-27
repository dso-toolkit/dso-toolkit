import { Icon } from '@dso-toolkit/sources';
import * as React from 'react';

import { DsoIcon } from '../..';
import { ComponentImplementation } from '../../templates';

export const reactIcon: ComponentImplementation<Icon> = {
  component: 'icon',
  implementation: 'react',
  template: () => function iconTemplate({ icon, slot }: Icon) {
    return (
      <DsoIcon
        icon={icon}
        slot={slot}
      ></DsoIcon>
    );
  }
};

