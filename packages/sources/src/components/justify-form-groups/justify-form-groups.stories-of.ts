import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';

import { JustifyFormGroupsArgs, justifyFormGroupsArgsMapper, justifyFormGroupsArgTypes } from './justify-form-groups.args';
import { JustifyFormGroups } from './justify-form-groups.models';

export interface JustifyFormGroupsTemplates<TemplateFnReturnType> {
  justifyFormGroupsTemplate: (justifyFormGroupsProperties: JustifyFormGroups<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfJustifyFormGroups<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, JustifyFormGroupsTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Justify Form Groups', storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: justifyFormGroupsArgTypes
    });

    const template = templateMapper<JustifyFormGroupsArgs>((args, { justifyFormGroupsTemplate }) => justifyFormGroupsTemplate(justifyFormGroupsArgsMapper(args)));

    stories.add(
      'justify form groups',
      template
    );
  });
}
