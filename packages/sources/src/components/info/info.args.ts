import { ArgTypes } from '../../storybook';
import { HandlerFunction } from '@storybook/addon-actions';
import { Info } from './info.models';

export interface InfoArgs<TemplateFnReturnType> {
  id: string;
  fixed: boolean;
  active: boolean;
  richContent: TemplateFnReturnType;
  dsoClose: HandlerFunction;
}

export const infoArgTypes: ArgTypes<InfoArgs<unknown>> = {
  id: {
    control: {
      type: 'text'
    }
  },
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

export function infoArgsMapper(a: InfoArgs<any>): Required<Info<any>> {
  return { ...a };
}
