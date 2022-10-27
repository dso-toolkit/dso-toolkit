import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { ContextArgs, contextArgsMapper, contextArgTypes } from './context.args';
import { Context } from './context.models';

export interface ContextTemplates<TemplateFnReturnType> {
  contextTemplate: (contextProperties: Context<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
  content: TemplateFnReturnType;
  label: TemplateFnReturnType;
}

export const storiesOfContext = storiesOfFactory<ContextTemplates<any>, ContextArgs>('Context', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: contextArgTypes
    });

  const template = templateMapper((args, { contextTemplate, children, content, label }) => contextTemplate(contextArgsMapper(args, content, children, label)));

  stories.add(
    'Label',
    template,
    {
      args: {
        type: 'label'
      }
    }
  );

  stories.add(
    'Legend',
    template,
    {
      args: {
        type: 'legend'
      }
    }
  );
});
