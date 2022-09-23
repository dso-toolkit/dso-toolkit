import { ArgTypes } from '../../storybook';
import { HandlerFunction } from '@storybook/addon-actions';
import { Info } from './info.models';

export interface InfoArgs<TemplateFnReturnType> {
  fixed?: boolean;
  active?: boolean;
  richContent: TemplateFnReturnType;
  dsoClose: HandlerFunction;
}

export const infoArgTypes: ArgTypes<InfoArgs<unknown>> = {
  fixed: {
    control: {
      type: 'boolean'
    }
  },
  active: {
    control: {
      type: 'boolean'
    }
  },
  dsoClose: {
    action: 'dsoClosed'
  },
  richContent: {
    control: {
      disable: true
    }
  }
};

export function infoArgsMapper(a: InfoArgs<any>): Info<any> {
  return {
    onClose: e => a.dsoClose(e),
    richContent: a.richContent,
    active: a.active,
    fixed: a.fixed
  };
}
