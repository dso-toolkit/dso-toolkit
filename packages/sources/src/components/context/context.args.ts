import { ArgTypes } from '../../stories-helpers';

import { Context } from './context.models';

export interface ContextArgs<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  content: TemplateFnReturnType;
  label: TemplateFnReturnType;
  type: 'legend' | 'label';
}

export const contextArgTypes: ArgTypes<ContextArgs<unknown>> = {
  type: {
    options: ['legend', 'label'],
    control: {
      type: 'select'
    }
  },
  label: {
    control: {
      disable: true
    }
  },
  children: {
    control: {
      disable: true
    }
  },
  content: {
    control: {
      disable: true
    }
  }
};

export function contextArgsMapper(a: ContextArgs<any>): Context<any> {
  return {
    content: a.content,
    children: a.children,
    label: a.label,
    type: a.type
  };
}
