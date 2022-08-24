import { ArgTypes } from '../../storybook';
import { HandlerFunction } from '@storybook/addon-actions';

import { Alert, AlertType } from './alert.models';

export interface AlertArgs<TemplateFnReturnType> {
  status: AlertType;
  message: TemplateFnReturnType | string;
  click: HandlerFunction;
  withRoleAlert: boolean;
  withButton: boolean;
}

export const alertArgTypes: ArgTypes<AlertArgs<unknown>> = {
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
    onClick: a.withButton ? () => a.click(a) : undefined,
    withRoleAlert: a.withRoleAlert
  };
}
