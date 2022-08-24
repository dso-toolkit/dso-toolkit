import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { justifyFormGroupsArgsMapper, justifyFormGroupsArgTypes } from './justify-form-groups.args';
import { JustifyFormGroups } from './justify-form-groups.models';

export interface JustifyFormGroupsParameters<TemplateFnReturnType> {
  justifyFormGroupsTemplate: (justifyFormGroupsProperties: JustifyFormGroups<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfJustifyFormGroups<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    justifyFormGroupsTemplate: JustifyFormGroups
  }: JustifyFormGroupsParameters<TemplateFnReturnType>
) {
  const stories = createStories('Form/justify form groups', parameters, justifyFormGroupsArgTypes);
  const template = bindTemplate(justifyFormGroupsArgsMapper, JustifyFormGroups);

  stories.add(
    'justify form groups',
    template
  );
}
