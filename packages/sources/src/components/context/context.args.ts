import { ArgTypes } from '../../stories-helpers';

import { Context } from './context.models';

export interface ContextArgs<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  label: string;
  type: 'legend' | 'label';
}

export const contextArgTypes: ArgTypes<ContextArgs<unknown>> = {
  children: {
    control: {
      disable: true
    }
  },
  label: {
    control: {
      type: 'text'
    }
  },
  type: {
    options: ['legend', 'label'],
    control: {
      type: 'select'
    }
  }
};

export function contextArgsMapper(a: ContextArgs<any>): Context<any> {
  return {
    children: a.children,
    label: a.label,
    type: a.type
  };
}
