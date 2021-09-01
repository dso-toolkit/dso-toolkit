import { ArgTypes } from '../../stories-helpers';

import { Context } from './context.models';

export interface ContextArgs<TemplateFnReturnType> {
  content: TemplateFnReturnType;
  children: TemplateFnReturnType;
  label: TemplateFnReturnType;
  type: 'legend' | 'label';
}

export const contextArgTypes: ArgTypes<Omit<ContextArgs<unknown>, 'content' | 'children'>> = {
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
    content: a.content,
    children: a.children,
    label: a.label,
    type: a.type
  };
}
