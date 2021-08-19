import { ArgTypes } from '../../stories-helpers';
import { ApplicationHeader } from './app-heading.models';

export interface ApplicationHeaderArgs {
  title: string;
  subtitle?: string;
  step?: string;
}

export const applicationHeaderArgTypes: ArgTypes<ApplicationHeaderArgs> = {
  title: {
    control: {
      type: 'text'
    }
  },
  subtitle: {
    control: {
      type: 'text'
    }
  },
  step: {
    control: {
      type: 'text'
    }
  }
};

export function applicationHeaderArgsMapper(a: ApplicationHeaderArgs): ApplicationHeader {
  return {
    title: a.title,
    subtitle: a.subtitle,
    step: a.step
  };
}
