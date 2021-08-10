import { ArgTypes } from '../../stories-helpers';
import { ApplicationHeader } from './application-header.models';

export interface ApplicationHeaderArgs {
  count: number;
}

export const applicationHeaderArgTypes: ArgTypes<ApplicationHeaderArgs> = {
  count: {
    control: {
      type: 'number'
    }
  }
};

export function applicationHeaderArgsMapper(a: ApplicationHeaderArgs): ApplicationHeader {
  return {
    count: a.count
  };
}
