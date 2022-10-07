import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { JustifyFormGroupsArgs, justifyFormGroupsArgsMapper, justifyFormGroupsArgTypes } from './justify-form-groups.args';
import { JustifyFormGroups } from './justify-form-groups.models';

export interface JustifyFormGroupsTemplates<TemplateFnReturnType> {
  justifyFormGroupsTemplate: (justifyFormGroupsProperties: JustifyFormGroups<TemplateFnReturnType>) => TemplateFnReturnType;
}

export const storiesOfJustifyFormGroups = storiesOfFactory<JustifyFormGroupsTemplates<any>, JustifyFormGroupsArgs>('Justify Form Groups', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: justifyFormGroupsArgTypes
  });

  const template = templateMapper((args, { justifyFormGroupsTemplate }) => justifyFormGroupsTemplate(justifyFormGroupsArgsMapper(args)));

  stories.add(
    'justify form groups',
    template
  );
})

// export function storiesOfJustifyFormGroups<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     justifyFormGroupsTemplate: JustifyFormGroups
//   }: JustifyFormGroupsParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Form/justify form groups', parameters, justifyFormGroupsArgTypes);
//   const template = bindTemplate(justifyFormGroupsArgsMapper, JustifyFormGroups);


// }
