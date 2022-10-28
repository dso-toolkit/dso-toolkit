import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { LabelGroupArgs, labelGroupArgsMapper, labelGroupArgTypes } from './label-group.args';
import { LabelGroup } from './label-group.models';

export interface LabelGroupTemplates<TemplateFnReturnType> {
  labelGroupTemplate: (labelGroupProperties: LabelGroup) => TemplateFnReturnType;
}

export const storiesOfLabelGroup = storiesOfFactory<LabelGroupTemplates<any>, LabelGroupArgs>('Label Group', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: labelGroupArgTypes
    });

  const template = templateMapper((_args, { labelGroupTemplate }) => labelGroupTemplate(labelGroupArgsMapper()));

  stories.add(
    'Label Group',
    template
  );
});
