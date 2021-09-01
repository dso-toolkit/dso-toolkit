import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { contextArgsMapper, contextArgTypes } from './context.args';
import { Context } from './context.models';

export interface ContextParameters<TemplateFnReturnType> {
  contextTemplate: (contextProperties: Context<TemplateFnReturnType>) => TemplateFnReturnType;
  label: TemplateFnReturnType;
  content: TemplateFnReturnType;
  children: TemplateFnReturnType;
}

export function storiesOfContext<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    contextTemplate,
    label,
    content,
    children
  }: ContextParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(contextArgsMapper, contextTemplate);

  const stories = storiesOf('Context', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        label,
        content,
        children
      },
      argTypes: contextArgTypes
    });

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
