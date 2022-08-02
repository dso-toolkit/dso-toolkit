import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { justifyFormGroupsArgsMapper, justifyFormGroupsArgTypes } from './justify-form-groups.args';
import { JustifyFormGroups } from './justify-form-groups.models';

export interface JustifyFormGroupsParameters<TemplateFnReturnType> {
  justifyFormGroupsTemplate: (justifyFormGroupsProperties: JustifyFormGroups<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfJustifyFormGroups<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    justifyFormGroupsTemplate: JustifyFormGroups
  }: JustifyFormGroupsParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(justifyFormGroupsArgsMapper, JustifyFormGroups);

  const stories = storiesOf('Form/justify form groups', mainModule)
    .addParameters({
      docs: {
        page: readme
      }
    });

  stories.add(
    'justify form groups',
    template
  );
}
