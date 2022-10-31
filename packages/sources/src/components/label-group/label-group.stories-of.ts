import { StoriesOfArguments, storiesOfFactory } from '../../storybook/stories-of-factory';

import { labelGroupArgsMapper } from './label-group.args';
import { LabelGroup } from './label-group.models';

export interface LabelGroupTemplates<TemplateFnReturnType> {
  labelGroupTemplate: (labelGroupProperties: LabelGroup) => TemplateFnReturnType;
}

export function storiesOfLabelGroup<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, LabelGroupTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Label Group', storiesOfArguments, (stories, templateMapper) => {
    const template = templateMapper((_args, { labelGroupTemplate }) => labelGroupTemplate(labelGroupArgsMapper()));

    stories.add(
      'Label Group',
      template
    );
  });
}
