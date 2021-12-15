import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';

import { AlertType } from '../alert/alert.models';

import { Conclusion, ConclusionItem } from './conclusion.models';

export interface ConclusionArgs<TemplateFnReturnType> {
  items: ConclusionItem[];
  alertMessage?: string;
  alertStatus?: AlertType;
  info?: TemplateFnReturnType;
  infoFixed?: boolean;
  infoActive?: boolean;
  infoClosed: HandlerFunction;
  infoToggled: HandlerFunction;
}

export const conclusionArgTypes: ArgTypes<ConclusionArgs<unknown>> = {
  items: {
    control: {
      disable: true
    }
  },
  alertMessage: {
    control: {
      type: 'string'
    }
  },
  alertStatus: {
    options: ['success', 'info', 'warning', 'danger'],
    control: {
      type: 'select'
    }
  },
  infoFixed: {
    control: {
      type: 'boolean'
    }
  },
  info: {
    control: {
      disable: true
    }
  },
  infoActive: {
    control: {
      type: 'boolean'
    }
  },
  infoClosed: {
    action: 'infoClosed'
  },
  infoToggled: {
    action: 'infoToggled'
  }
};

export function conclusionArgsMapper(a: ConclusionArgs<any>): Conclusion<any> {
  return {
    items: a.items,
    alert: a.alertMessage && a.alertStatus
      ? {
        message: a.alertMessage,
        status: a.alertStatus
      }
      : undefined,
    info: a.info
      ? {
        onClose: e => a.infoClosed(e),
        richContent: a.info,
        active: a.infoActive,
        fixed: a.infoFixed
      }
      : undefined
  };
}
