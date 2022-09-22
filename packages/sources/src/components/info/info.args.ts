import { ArgTypes } from '../../storybook';
import { HandlerFunction } from '@storybook/addon-actions';
import { Info } from './info.models';

export interface InfoArgs<TemplateFnReturnType> {
  fixed?: boolean;
  active?: boolean;
  richContent: TemplateFnReturnType;
  onDsoClose: HandlerFunction;
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
  onDsoClose: {
    action: 'onDsoClosed'
  },
  richContent: {
    control: {
      disable: true
    }
  }
};

export function infoArgsMapper(a: InfoArgs<any>): Info<any> {
  return {
    onClose: e => a.onDsoClose(e),
    richContent: a.richContent,
    active: a.active,
    fixed: a.fixed
  };
}
