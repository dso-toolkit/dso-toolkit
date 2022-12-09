import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { labelGroupArgsMapper } from "./label-group.args.js";
import { LabelGroup } from "./label-group.models.js";

export interface LabelGroupTemplates<TemplateFnReturnType> {
  labelGroupTemplate: (labelGroupProperties: LabelGroup) => TemplateFnReturnType;
}

export function storiesOfLabelGroup<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    LabelGroupTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Label Group", storiesOfArguments, (stories, templateMapper) => {
    const template = templateMapper((_args, { labelGroupTemplate }) => labelGroupTemplate(labelGroupArgsMapper()));

    stories.add("Label Group", template);

    return stories;
  });
}
