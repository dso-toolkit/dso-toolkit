import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { JustifyFormGroups } from "./justify-form-groups.models.js";

export interface JustifyFormGroupsTemplates<TemplateFnReturnType> {
  justifyFormGroupsTemplate: (
    justifyFormGroupsProperties: JustifyFormGroups<TemplateFnReturnType>
  ) => TemplateFnReturnType;
}

export interface JustifyFormGroupsParameters<TemplateFnReturnType> {
  content: JustifyFormGroups<TemplateFnReturnType>;
}

export function storiesOfJustifyFormGroups<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    JustifyFormGroupsTemplates<TemplateFnReturnType>
  >,
  { content }: JustifyFormGroupsParameters<TemplateFnReturnType>
) {
  return storiesOfFactory("Form/justify form groups", storiesOfArguments, (stories, templateMapper) => {
    stories.add(
      "justify form groups",
      templateMapper((_args, { justifyFormGroupsTemplate }) => justifyFormGroupsTemplate(content))
    );

    return stories;
  });
}
