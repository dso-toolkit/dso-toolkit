import { ArgTypes } from '../../stories-helpers';
import { HandlerFunction } from '@storybook/addon-actions';
import { Info } from './info.models';

export interface InfoArgs<TemplateFnReturnType> {
  fixed?: boolean;
  active?: boolean;
  richContent: TemplateFnReturnType;
  close: HandlerFunction;
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
  close: {
    action: 'closed'
  },
  richContent: {
    control: {
      disable: true
    }
  }
};

export function infoArgsMapper(a: InfoArgs<any>): Info<any> {
  return {
    onClose: e => a.close(e),
    richContent: a.richContent,
    active: a.active,
    fixed: a.fixed
  };
}
