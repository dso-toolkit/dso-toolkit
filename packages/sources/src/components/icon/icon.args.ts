import { ArgTypes } from '../../stories-helpers';
import { Icon } from './icon.models';

export interface IconArgs {
  icon: string;
}

export const iconArgTypes: ArgTypes<IconArgs> = {
  icon: {
    options: ['user', 'table'],
    control: {
      type: 'select',
    }
  }
};

export function iconArgsMapper(a: IconArgs): Icon {
  return {
    icon: a.icon
  };
}
