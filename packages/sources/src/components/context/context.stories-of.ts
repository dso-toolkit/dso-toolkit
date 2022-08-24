import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { contextArgsMapper, contextArgTypes } from './context.args';
import { Context } from './context.models';

export interface ContextParameters<TemplateFnReturnType> {
  contextTemplate: (contextProperties: Context<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
  content: TemplateFnReturnType;
  label: TemplateFnReturnType;
}

export function storiesOfContext<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    contextTemplate,
    children,
    content,
    label
  }: ContextParameters<TemplateFnReturnType>
) {
  const stories = createStories('Context', parameters, contextArgTypes)
    .addParameters({
      args: {
        children,
        content,
        label
      }
    });

  const template = bindTemplate(contextArgsMapper, contextTemplate);

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
}
