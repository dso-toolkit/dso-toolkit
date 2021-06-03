import { ArgTypes } from '../../stories-helpers';
import { HandlerFunction } from '@storybook/addon-actions';

import { Alert } from './alert.models';

export interface AlertArgs<TemplateFnReturnType> {
  status: 'success' | 'info' | 'warning' | 'danger';
  message: TemplateFnReturnType | string;
  click: HandlerFunction;
  withRoleAlert: boolean;
  withButton: boolean;
}

export const alertTypeArgs: ArgTypes<AlertArgs<unknown>> = {
  status: {
    options: ['success', 'info', 'warning', 'danger'],
    control: {
      type: 'select',
    }
  },
  message: {
    control: {
      type: 'text',
      required: true
    }
  },
  withRoleAlert: {
    control: {
      type: 'boolean'
    }
  },
  withButton: {
    control: {
      type: 'boolean'
    }
  },
  click: {
    action: 'closed'
  }
};

export function alertArgsMapper(a: AlertArgs<any>): Alert<any> {
  return {
    message: a.message,
    status: a.status,
    onClick: a.withButton ? e => a.click(a) : undefined,
    withRoleAlert: a.withRoleAlert
  };
}
