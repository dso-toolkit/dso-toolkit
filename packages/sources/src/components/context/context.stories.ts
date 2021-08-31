import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { contextArgsMapper, contextArgTypes } from './context.args';
import { Context } from './context.models';

export interface ContextParameters<TemplateFnReturnType> {
  contextTemplate: (contextProperties: Context<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfContext<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    contextTemplate: contextTemplate
  }: ContextParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(contextArgsMapper, contextTemplate);

  const stories = storiesOf('Context', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: contextArgTypes
    });

  stories.add(
    'Label',
    template,
    {
      args: {
        label: 'Resultaten',
        type: 'label'
      }
    }
  );

  stories.add(
    'Legend',
    template,
    {
      args: {
        label: 'Resultaten',
        type: 'legend'
      }
    }
  );
}
